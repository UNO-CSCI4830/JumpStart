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

    // URI connection details for client to communicate with DB
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000, //Time out for server - set for 5 seconds
    }); // creates MongoClient instance

    const maxRetries = 3; // Maximum number of retry attemps for reading and writing
    const retryDelay = 1000; // Delay inbetween retries (counts in milliseconds)

    try { // attempt to establish a connection

        console.log(`Attempting connection to ${uri}...`);
        await client.connect(); // sit and wait for DB to respond with "promise"
        /* Blocks all following execution until DB promise has been received. Think c-s demo from comm networks */
        console.log(`Connected to ${uri}\n`);

        // define database object
        const postsDB = await client.db("Posts");

        // define collection objects
        const advice = await postsDB.collection("advice");

        // defining rw parameter documents
        //Retrive all documents from the advice collection
        var query = {};
        var proj = {};
        const advicePosts = await retryOperation(() => advice.find(query, proj).toArray(), maxRetries, retryDelay);
        console.log(`Current size of advice: ${advicePosts.length}`);

        // Update document
        const updateQuery = {id: 1};
        const updateOperation = {$inc: {likes:1} };
        const updateResult = await retryOperation(() => advice.updateOne(updateQuery, updateOperation), maxRetries, retryDelay);
        console.log(`Update result: ${updateResult.modifiedCount} document(s) modified`);

        // New Advice Document
        const newAdvice = {
            id: advicePosts.length+1,
            title: "Stay consisten",
            author: "Alex",
            date: new Date().toISOString(),
            tags: ["motivation", "consistency"],
            content: "Consistancy is key to success",
            likes: 0,
            hearts: 0,
        };
        const insertResult = await retryOperation(() => advice.insertOne(newAdvice), maxRetries, retryDelay);
        console.log(`Inserted new advice with ID: ${insertResult.insertedId}`);



        // doing some quick confirmations
        // ***console.log(`Current size of advice: ${advicePosts.length}`);
        /*
         * Contents of an advice document:
         * _id -> new ObjectId
         *     - dunno if we need this since id has already been defined
         * id -> int
         * title -> String
         * author -> String
         * date -> String
         *   - This is likely gonna be pipelined.
         *   - Date posted, but will be calculated by client to display shit like "1hr ago" depending on recency
         * tag -> Array of strings
         * content -> String
         * likes -> int
         * hearts -> int
         * - How tf to pull new like/heart values and write them BACK TO DB
         */

    } catch (e) { // print out what went wrong
        console.error("An error occurred: ", e.message);
    } finally { // close connection
        await client.close();
        console.log("Connection is closed");
    }
}
// Function to help retying operations
async function retryOperation(operation, retries, delay) {
    let attempt = 0;
    while (attempt < retries){
        try{
            return await operation();
        } catch (error){
            attempt++;
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt >= retries){
                throw new Error(`Operation failed after ${retries} attempts: ${error.message}`);
            }
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay)); //wait befor trying again
        }
    }
}


runAdvice().catch(console.error);
