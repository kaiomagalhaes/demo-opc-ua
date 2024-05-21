const fs = require('fs');
const readline = require('readline');
const { OPCUAClient, DataType } = require('node-opcua');

// Server configuration
const opcuaConfig = {
    endpointUrl: 'opc.tcp://opcua-server:4840', // Use the server name from Docker Compose
    nodeId: 'ns=1;s=the.node.identifier',
};

// Path to the data file
const dataFilePath = './data/client-data.json';

// Function to write a value to the OPC UA server
async function writeToOPCUAServer(session, value) {
    try {
        const statusCode = await session.writeSingleNode(opcuaConfig.nodeId, {
            dataType: DataType.Double,
            value: value,
        });

        console.log(`Write operation status code:`, statusCode.toString());
    } catch (error) {
        console.error('Failed to write to OPC UA server:', error);
    }
}

// Function to read data from the file and write to OPC UA server
async function readDataAndWriteToOPCUA(session) {
    const fileStream = fs.createReadStream(dataFilePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        const value = parseFloat(line);
        if (!isNaN(value)) {
            await writeToOPCUAServer(session, value);
        } else {
            console.error('Invalid number:', line);
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    }

    // Close the file stream and readline interface
    rl.close();
    fileStream.close();

    // Start over
    console.log('Restarting from the beginning of the file.');
    setImmediate(() => readDataAndWriteToOPCUA(session));
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
