// ### REFERENCES:
// MongoDB Manual: https://www.mongodb.com/docs/manual/crud/
// NodeJS Drivers Manual: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

const {MongoClient, ObjectId} = require('mongodb');

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
        console.error(e);
    } finally { // close connection
        await client.close();
    }
}

runAdvice().catch(console.error);
