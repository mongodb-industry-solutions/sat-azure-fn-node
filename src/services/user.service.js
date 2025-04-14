const mongodb = require("mongodb");
const DAO = require("./DAO");

/**
 * @class UserService
 * @classdesc Provides services for CRUD operations on the user collection using MongoDB native driver.
 */
class UserService extends DAO {

    /**
     * @param {Object} option - The database instance.
     * @param {mongodb.Db} option.db - The database instance.
     * @param {mongodb.MongoClient} [option.client] - The client connection instance.
     * @param {String} [option.uri] - The connection string.
     */
    constructor(options) {
        super({
            collectionName: process.env.MONGO_COLLECTION || "users",
            dbName: process.env.MONGO_DBNAME || "security",
            uri: options?.uri || process.env.MONGO_URI,
            client: options?.client,
            db: options?.db,
        });
    }

    /**
     * Fetches all users from the database.
     * @returns {Promise<User[]>} A promise that resolves to a list of users.
     */
    async getAll() {
        return await this.collection?.find().toArray();
    }

    /**
     * Fetches a single user by ID.
     * @param {string} id - The ID of the user.
     * @returns {Promise<User | null>} A promise that resolves to the user or null.
     */
    async getById(id) {
        const objectId = new mongodb.ObjectId(id);
        const user = await this.collection?.findOne({ _id: objectId });
        return user ? { _id: user._id.toString(), name: user.name, email: user.email } : null;
    }

    /**
     * Creates a new user in the database.
     * @param {User} user - The user to be created.
     * @returns {Promise<User>} The created user with assigned ID.
     */
    async create(user) {
        const result = await this.collection?.insertOne(user);
        return { _id: result.insertedId.toString(), ...user };
    }

    /**
     * Updates a user by ID with given data.
     * @param {string} id - The ID of the user.
     * @param {Partial<User>} updates - Data to update.
     * @returns {Promise<User | null>} The updated user.
     */
    async update(id, updates) {
        const objectId = new mongodb.ObjectId(id);
        const result = await this.collection?.findOneAndUpdate({ _id: objectId }, { $set: updates }, { returnDocument: 'after' });
        if (!result.value)
            return null;
        const { _id, name, email } = result.value;
        return { _id: _id.toString(), name, email };
    }

    /**
     * Deletes a user by ID.
     * @param {string} id - The ID of the user to delete.
     * @returns {Promise<User | null>} The deleted user.
     */
    async delete(id) {
        const objectId = new mongodb.ObjectId(id);
        const filter = { _id: objectId };
        const res = await this.collection?.deleteOne(filter);
        return res.deletedCount ? filter : null;
    }
}

module.exports = UserService;
