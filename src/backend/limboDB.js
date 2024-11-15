// ### REFERENCES:
// MongoDB Manual: https://www.mongodb.com/docs/manual/crud/
// NodeJS Drivers Manual: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

const {MongoClient, ObjectId} = require('mongodb');

/* ========== MAIN ========== */
async function runLimbo() {

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
        const limbo = await postsDB.collection("limbo");

        // defining rw parameter documents
        var query = {};
        var proj = {};

        // array of entries pulled from collections
        const pending = await limbo.find(query,proj).toArray();

        // doing some quick confirmations

        console.log(`Number of posts in limbo: ${pending.length}`);
        /*
         * Contents of any post in limbo:
         * _id -> new ObjectId
         *     - dunno if we need this since id has already been defined
         * id -> int
         * title -> String
         * uploader -> String
         *   - essentially the author
         * uploadDate -> String
         *   - Timestamp of submission
         * type -> String, either "resource" or "advice"
         *   - Specifies destination collection, if approved
         * status -> String
         *   - guessing it updates depending on what an admin decides
         */
        // pending.forEach(i => {
        //     console.log(`Post #${i.id}`);
        //     console.log(i);
        // })

    } catch (e) { // print out what went wrong
        console.error(e);
    } finally { // close connection
        await client.close();
    }
}

runLimbo().catch(console.error);
