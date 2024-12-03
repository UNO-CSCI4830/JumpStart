const {MongoClient, ObjectId} = require('mongodb');

module.exports = class Database {
    uri = "mongodb://localhost:27017"; // URI to mongoDB instacne. Be good to put this as a proxy and/or obfuscate lol
    dbName = ""; // Generic string for identifying DB to interact with
    collName = ""; // Igualmente for colllection name
    payload = []; // Where I'm expecting post data to go. Dunno if I wanna seperate incoming/outgoing payloads but that seems like a good idea
    errorStack = null; // How I'm currently passing along error codes from MongoDB to other sources for debugging atm
    retries = 3; // Maximum number of retry attemps for reading and writing
    delay = 1; // Delay inbetween retries (counts in milliseconds)

    // Constructors
    constructor(dbname, collname) {
        this.client = new MongoClient(this.uri, {
            serverSelectionTimeoutMS: 5000, //Time out for server - set for 5 seconds
        });
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
            // Enable a max of 3 requests to query database
            // const cursor = this.retryOperation(() => queryColl.find(params,projs), maxRetries, retryDelay); // since cursors reference objects...
            const cursor = queryColl.find(params,projs);

            this.payload = await cursor.toArray(); // and we want to make sure we get all objects

        } catch (e) {
            this.errorStack = e;
            console.error(`An error occured when retrieving posts from DB:\n${e}`);
        } finally {
            this.client.close();
        }
    }

    async push(data) {
    // TODO: write to DB
    return 0;
    }

    // async retryOperation(operation) {
    //     while (attempt < retries){
    //         try{
    //             return await operation();
    //         } catch (error){
    //             attempt++;
    //             console.error(`Attempt ${attempt} failed: ${error.message}`);
    //             if (attemtp >= retries){
    //                 throw new Error(`Operation failed after ${retries} attempts: ${error.message}`);
    //             }
    //             console.log(`Retrying in ${delay}ms...`);
    //             await new Promise(res => setTimeout(res, delay)); //wait befor trying again
    //         }
    //     }
    // }


    // Getters
    getPayload() { return this.payload; }
    getError() { return this.errorStack; }
}

