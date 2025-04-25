## Project: Azure Functions Service - CRUD Implementation on Users Collection

### Overview

This project demonstrates the functionality and versatility of Azure Functions by implementing a CRUD (Create, Read, Update, Delete) service for managing a collection of users stored in MongoDB. It also includes a method for retrieving metadata that exposes environment variables to help understand failure points and integration challenges in a real-world scenario.

By exploring the inner workings of Azure Functions, this project aims to showcase the deployment and execution of serverless functions, leveraging MongoDB as a backend database service.

### Features

- **User CRUD Operations**: 
  - **Create**: Add new user data to the MongoDB collection.
  - **Read**: Retrieve user data from the collection.
  - **Update**: Modify existing user information.
  - **Delete**: Remove user entries from the collection.

- **Metadata Retrieval**: 
  - Retrieve and display environment variables to understand configuration impacts and potential problems during integration, although exposing sensitive data is shown here for educational purposes.

### Setup and Configuration

#### Azure Function Apps

To configure the Azure Function Apps, start with updating the `local.settings.json` file to manage your environment variables and connection strings:

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "MONGO_COLLECTION": "users",
    "MONGO_DBNAME": "security",
    "MONGO_URI": "mongodb+srv://username:password@solutionsassurance.n0kts.mongodb.net/?retryWrites=true&w=majority&appName=MyLocalApp"
  }
}
```

### Deployment Instructions

#### Fetch Remote Configurations

You can fetch configurations and storage connections using Azure CLI:

```sh
func azure functionapp fetch-app-settings sat-fn-connector
func azure storage fetch-connection-string mdbsat
```

#### Publish the Function App

Deploy your function app to Azure with:

```sh
func azure functionapp publish sat-fn-connector
# Getting site publishing info...
# [2025-04-25T11:13:30.780Z] Starting the function app deployment...
# Creating archive for current directory...
# Uploading 2.27 MB [###############################################################################]
# Upload completed successfully.
# Deployment completed successfully.
# [2025-04-25T11:14:11.706Z] Syncing triggers...
# Functions in sat-fn-connector:
#     UserDelete - [httpTrigger]
#         Invoke url: https://sat-fn-connector.azurewebsites.net/api/users/{id}

#     UserGetAll - [httpTrigger]
#         Invoke url: https://sat-fn-connector.azurewebsites.net/api/users

#     UserInsert - [httpTrigger]
#         Invoke url: https://sat-fn-connector.azurewebsites.net/api/users

#     UserMetadata - [httpTrigger]
#         Invoke url: https://sat-fn-connector.azurewebsites.net/api/users

#     UserSelect - [httpTrigger]
#         Invoke url: https://sat-fn-connector.azurewebsites.net/api/users/{id}

#     UserUpdate - [httpTrigger]
#         Invoke url: https://sat-fn-connector.azurewebsites.net/api/users/{id}
```

#### Run the Function App Service

Execute the deployed function and test it using HTTP requests:

```sh
GET  https://sat-fn-connector.azurewebsites.net/api/users
```

### Related Concepts

#### CRUD Operations

CRUD operations enable effective data handling in MongoDB using Node.js drivers in various deployment environments like MongoDB Atlas, MongoDB Enterprise, and MongoDB Community. This includes data analysis using aggregation pipelines and networking through features like Azure Private Link when deploying M10 or larger clusters.

#### Integration of Azure and MongoDB

The project leverages the MongoDB ecosystem including App Services and real-time data processing through change streams and triggers. Azure IoT Hub and Azure Stream Analytics facilitate IoT device interactions and data filtering, moving data seamlessly into MongoDB.

#### Data Science and Analytics

By utilizing tools such as Azure AI Studio and Fabric Power BI, advanced data processing and analytics are achieved, allowing for the generation of insights from medical imaging data, as demonstrated in the sample use case.

### Additional Resources

To explore the implementation further, leverage resources that detail CRUD operations, Atlas Stream Processing, and the full capabilities of MongoDB in conjunction with Azure services. Properly analyze data using MongoDB Atlas through provided links or repositories that elaborate on these concepts.

By building a comprehensive understanding of Azure Functions linked with MongoDB collections, you gain the ability to deploy scalable, efficient serverless applications capable of processing and displaying critical user data and system configurations.

## References
- [CRUD Operations](https://mongodb.com/docs/drivers/node/current/fundamentals/crud/)
- [CRUD Fundamentals Operations](https://mongodb.com/docs/drivers/kotlin/coroutine/current/fundamentals/crud/)
- [Getting Started with MongoDB Atlas, NodeJS, and Azure App Service](https://www.mongodb.com/developer/products/atlas/getting-started-azure-app-service-atlas)
- [Real-time card fraud solution accelerator](https://www.mongodb.com/solutions/solutions-library/real-time-card-fraud-solution)
- [SOLUTIONS](https://www.mongodb.com/solutions/solutions-library/ai-powered-healthcare)
- [Building an IoT data hub for smart manufacturing](https://www.mongodb.com/solutions/solutions-library/manufacturing-iot-data-hub-solution)