// ### REFERENCES:
// MongoDB Manual: https://www.mongodb.com/docs/manual/crud/
// NodeJS Drivers Manual: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

const {MongoClient, ObjectId} = require('mongodb');

export class Database {
    uri = "mongodb://localhost:27017/";
    constructor() {
        this.client = new MongoClient(this.uri);
    }

    connect() {
        try {
            console.log("Attempting to connect to DB...");
            this.client.connect();
            console.log("Connection accepted.");
        } catch (e) {
            console.error(`An error occured when connecting to DB:\n${e}`);
        }
    }

    close() {
        try {
            this.client.close()
        } catch(e) {
            console.error(`An error occured while closing connection:\n${e}`);
        }
    }

    load() {}
    query() {}
    add(){}
    del(){}
}

/* ========== MAIN ========== */
async function runAdvice() {

    // URI connection details for client to communicate with DB
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri); // creates MongoClient instance

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
        var query = {};
        var proj = {};

        // array of entries pulled from collections
        const advicePosts = await advice.find(query,proj).toArray();

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

    } catch (e) { // print out what went wrong
        console.error(e);
    } finally { // close connection
        await client.close();
    }
}

runAdvice().catch(console.error);
