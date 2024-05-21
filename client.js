const fs = require('fs');
const { OPCUAClient, DataType } = require('node-opcua');
const csv = require('csv-parser');

// Server configuration
const opcuaConfig = {
    endpointUrl: 'opc.tcp://opcua-server:4840', // Use the server name from Docker Compose
    nodeId: 'ns=1;s=the.node.identifier',
};

// Path to the data file
const dataFilePath = './data/predictive_maintenance.csv';

let rows = [];

// Function to write an object to the OPC UA server
async function writeToOPCUAServer(session, data) {
    try {
        const statusCode = await session.writeSingleNode(opcuaConfig.nodeId, {
            dataType: DataType.String,
            value: JSON.stringify(data),
        });

        console.log(`Write operation status code:`, statusCode.toString());
    } catch (error) {
        console.error('Failed to write to OPC UA server:', error);
    }
}

// Function to process rows and write data to the OPC UA server
async function processRows(session) {
    for (const data of rows) {
        await writeToOPCUAServer(session, data);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    }

    // Restart reading the file after processing all rows
    console.log('Finished processing rows. Restarting file read.');
    readDataAndWriteToOPCUA(session);
}

// Function to read data from the file and store it in memory
async function readDataAndWriteToOPCUA(session) {
    rows = [];
    fs.createReadStream(dataFilePath)
        .pipe(csv())
        .on('data', (row) => {
            rows.push(row);
        })
        .on('end', async () => {
            console.log('Finished reading file. Processing rows.');
            await processRows(session);
        });
}

// Main function to manage OPC UA connection and session
async function main() {
    const client = OPCUAClient.create({ endpointMustExist: false });

    try {
        await client.connect(opcuaConfig.endpointUrl);
        console.log('Connected to the OPC UA server.');

        const session = await client.createSession();
        console.log('OPC UA session created.');

        await readDataAndWriteToOPCUA(session);

    } catch (error) {
        console.error('Failed to connect to OPC UA server:', error);
    }
}

main();
