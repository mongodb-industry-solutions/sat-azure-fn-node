## Azure Function Apps


FILE: `local.settings.json`

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

Get all remote configurations
```sh
func azure functionapp fetch-app-settings sat-fn-connector
func azure storage fetch-connection-string mdbsat
```

Publish the function app
```sh
func azure functionapp publish sat-fn-connector
# Getting site publishing info...
# [2025-04-24T15:02:07.362Z] Starting the function app deployment...
# Creating archive for current directory...
# Uploading 2.27 MB [###############################################################################]
# Upload completed successfully.
# Deployment completed successfully.
# [2025-04-24T15:02:47.936Z] Syncing triggers...
# Functions in sat-fn-connector:
#     GetUsers - [httpTrigger]
#         Invoke url: https://sat-fn-connector.azurewebsites.net/api/getusers
```

Run the funtion app service
```sh
GET https://sat-fn-connector.azurewebsites.net/api/GetUsers
```