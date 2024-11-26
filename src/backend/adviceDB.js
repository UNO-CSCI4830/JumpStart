// ### REFERENCES:
// MongoDB Manual: https://www.mongodb.com/docs/manual/crud/
// NodeJS Drivers Manual: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

const {MongoClient, ObjectId} = require('mongodb');

class Database {
    uri = "mongodb://localhost:27017"; // URI to mongoDB instacne. Be good to put this as a proxy and/or obfuscate lol
    dbName = ""; // Generic string for identifying DB to interact with
    collName = ""; // Igualmente for colllection name
    payload = []; // Where I'm expecting post data to go. Dunno if I wanna seperate incoming/outgoing payloads but that seems like a good idea
    errorStack = null; // How I'm currently passing along error codes from MongoDB to other sources for debugging atm
    params = {}; // Query parameters
    projs = {}; // Field filtering parameters unique to the find and findAll calls

    constructor(dbname, collname) {
        this.client = new MongoClient(this.uri);
        this.dbName = dbname;
        this.collName = collname;
    }

    async query() {
        try {
            console.log("Attempting to connect to DB...");
            await this.client.connect(); // Connect to MongoDB instance
            console.log(`Connected to DB!`);
            const queryColl = await this.client.db(this.dbName).collection(this.collName); // Connect to Collection to retrieve contents
            this.payload = await queryColl.find(this.params,this.projs).toArray();
        } catch (e) {
            this.errorStack = e;
            console.error(`An error occured when connecting ot DB:\n${e}`);
        } finally {
            this.client.close();
        }
    }

    getPayload() {
        return this.payload;
    }
}


/* ========== MAIN ========== */
async function runAdvice() {

    const advice = new Database("Posts", "advice");
    await advice.query();
    const advicePosts = advice.getPayload();



    // doing some quick confirmations
    console.log(`Current size of advice: ${advicePosts.length}`);

    // Skeleton entry class
    var entry = {
        _id : new ObjectId(), // dunno if we need this b/c the following field...
        id : 0, // If used, how do we check to incrament? Sort via field()? Pipeline via agreggate seems unnecessary
        title : "",
        author : "",
        date : "", // save entry time, but use pipeline to make it human-readable
        tag : [], // array of strings representing filterable tags
        content: "",
        /* How to pull like/heart data and update entry */
        likes : 0,
        hearts : 0,
    }

}

runAdvice().catch(console.error);
