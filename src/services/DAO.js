const mongodb = require("mongodb");

class DAO {

    /**
     * @typedef {mongodb.MongoClient}
     */
    client;
    /**
     * @typedef {mongodb.Db}
     */
    db;

    /**
     * @param {Object} option - The database instance.
     * @param {mongodb.Db} option.db - The database instance.
     * @param {mongodb.MongoClient} [option.client] - The client connection instance.
     * @param {String} [option.collectionName] - The collection name.
     * @param {String} [option.dbName] - The database name.
     * @param {String} [option.uri] - The connection string.
     */
    constructor({ collectionName, dbName, db = null, client = null, uri = null }) {
        this.collectionName = collectionName;
        this.client = client;
        this.dbName = dbName;
        this.uri = uri;
        this.db = db;
    }

    /**
     * Get service metadata 
     */
    get metadata() {
        return {
            dbName: this.dbName,
            collectionName: this.collectionName,
            uri: this.uri
        }
    }

    /**
     * Get collection instance
     * @returns {Promise<mongodb.Collection>} A promise that resolves to a list of users.
     */
    get collection() {
        return this.db.collection(this.collectionName);
    }

    /**
     * Create a client connection  
     * @param {String} uri 
     * @returns {mongodb.MongoClient}
     */
    getClient(uri) {
        this.uri = uri || this.uri;
        this.client = this.client || new mongodb.MongoClient(uri);
        return this.client;
    }

    /**
     * Connect to the database 
     * @param {String} [uri] 
     * @param {String} [dbName] 
     * @returns {mongodb.Db}
     */
    async connect(uri = null, dbName = null) {
        try {
            uri = uri || this.uri;
            dbName = dbName || this.dbName;
            this.uri = uri || this.uri;
            const client = this.getClient(uri);
            this.db = client.db(dbName);
            return this.db;
        }
        catch (err) {
            console.error({
                msg: "MongoDB connection error",
                data: { uri, dbName },
                error: err
            });
        }
    }

    /**
     * Close MongoDB client connection
     * @returns {Promise<void>}
     */
    close() {
        return this.client?.close();
    }
}

module.exports = DAO;