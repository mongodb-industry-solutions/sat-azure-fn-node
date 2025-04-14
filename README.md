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
func azure functionapp fetch-app-settings sat-fn-demo
func azure storage fetch-connection-string sat-store
```

Publish the function app
```sh
func azure functionapp publish sat-fn-demo
```

