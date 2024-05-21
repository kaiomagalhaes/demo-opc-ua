# OPC UA Client and Server with File-Based Data Input

The OPC UA Client and Server project is a Node.js application designed to demonstrate the use of OPC UA for data communication. The client reads Lux values from a file and sends them to the OPC UA server, which processes and stores the data in a MongoDB database. This setup is useful for simulating sensor data input and can be adapted for various IoT and industrial applications.

This project is a key component in the tutorial [Building a minimal OPC UA integration to collect office data with Arduino and Raspberry PI 3](https://kaiomagalhaes.com).

## Features

- **OPC UA Server**: Implements an OPC UA server using the `node-opcua` library, allowing for standardized communication within industrial and IoT systems.
- **OPC UA Client**: Reads sensor data from a CSV file and sends it to the OPC UA server.
- **File-Based Data Input**: Simulates sensor data by reading from a file, making it easy to test and demonstrate OPC UA capabilities without actual hardware.
- **Real-Time Data Processing**: Processes and stores real-time sensor data, facilitating immediate insights and actions.
- **MongoDB Integration**: Stores received sensor data in a MongoDB database, providing a robust mechanism for data persistence and later analysis.

## Prerequisites

Before starting, ensure you have the following:

- **Node.js**: Installed on your system.
- **Docker**: Installed on your system.
- **Docker Compose**: Installed on your system.
- **MongoDB Access**: Either a local MongoDB instance or access to a MongoDB Atlas cluster.
- **Environment Configuration**: Knowledge of configuring environment variables for Node.js applications, particularly for sensitive information like database connection strings.

## Installation

1. **Clone the Repository**:  
   Obtain the project by cloning this repository to your local machine:

   ```bash
   git clone https://github.com/kaiomagalhaes/opc-ua-client-server
   ```

## Usage

1. **Build and Run the Containers**:  
   Use Docker Compose to build and start the containers:

   ```bash
   docker-compose build
   docker-compose up
   ```

The OPC UA client will read sensor data from data/predictive_maintenance.csv and send them to the OPC UA server every second. The server will process and store the data in the MongoDB database.

## Contributing

Your contributions make the open-source community a fantastic place to learn, inspire, and create. Any contributions you make are highly appreciated. To contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -am 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## Contact

For questions or feedback regarding the OPC UA Client and Server project, please reach out to me@kaiomagalhaes.com.
