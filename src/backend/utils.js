const {MongoClient, ObjectId} = require('mongodb');

module.exports = class Database {
    uri = "mongodb://localhost:27017"; // URI to mongoDB instacne. Be good to put this as a proxy and/or obfuscate lol
    dbName = ""; // Generic string for identifying DB to interact with
    collName = ""; // Igualmente for colllection name
    payload = []; // Where I'm expecting post data to go. Dunno if I wanna seperate incoming/outgoing payloads but that seems like a good idea
    errorStack = null; // How I'm currently passing along error codes from MongoDB to other sources for debugging atm

    // Constructors
    constructor(dbname, collname) {
        this.client = new MongoClient(this.uri);
        this.dbName = dbname;
        this.collName = collname;
    }

    // Setters
    async pull(params = {}, projs = {}) {
        console.log("DB instance: searching with params:");
        console.log(params);
        try {
            console.log("Attempting to connect to DB...");
            await this.client.connect(); // Connect to MongoDB instance
            console.log(`Connected to DB!`);
            const queryColl = await this.client.db(this.dbName).collection(this.collName); // Connect to Collection to retrieve contents
            this.payload = await queryColl.find(params, projs).toArray();
        } catch (e) {
            this.errorStack = e;
            console.error(`An error occured when connecting ot DB:\n${e}`);
        } finally {
            this.client.close();
        }
    }

    async push(data) {
    // TODO: write to DB
    return 0;
    }

    // Getters
    getPayload() { return this.payload; }
    getError() { return this.errorStack; }
}

