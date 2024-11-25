// ### REFERENCES:
// MongoDB Manual: https://www.mongodb.com/docs/manual/crud/
// NodeJS Drivers Manual: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

const resourcePosts = require("./resourcePosts.js").resourcePosts;
const advicePosts = require("./advicePosts.js").advicePosts;

const {MongoClient, ObjectId} = require('mongodb');
/* ObjectId() is a function that generates a new 12B ID in hex */

/* ========== SOME ADMIN FUNCTIONS FOR DB OPERATIONS ========== */
/* Example of how a function using MongoDB drivers is supposed to look */
async function listDBs(client) { // Lists all DBs in a MonboDB instance
    let dbList = await client.db().admin().listDatabases();
    dbList.databases.forEach(db => console.log(`${db.name}`));
    return dbList;
}

async function getDB(client, db_name) { // locates and pings a specified db. Returns DB object
    let database= await client.db(db_name);
    await database.command({ping: 1});
    console.log("Pinged db1.");
    return database;
}

/* ========== RUN ========== */
async function run() {

    // URI connection details for client to communicate with DB
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri); // creates MongoClient instance

    // advicePosts.forEach(x => {
    //     console.log(`Entry ${(advicePosts.indexOf(x)) + 1}:`);
    //     console.log(x);
    // });
    //

    console.log(`size of advice array: ${advicePosts.length}`);
    console.log(`size of resources array: ${resourcePosts.length}`);

    try { // attempt to establish a connection
        console.log(`Attempting connection to ${uri}...`);
        await client.connect(); // sit and wait for DB to respond with "promise"
        /* Blocks all following execution until DB promise has been received. Think c-s demo from comm networks */
        console.log(`Connected to ${uri}\n`);

        /* ========== DB Object mgmt ========== */
        console.log(`Retrieving all DBs...`);
        await listDBs(client); 

        console.log(`Connecting to db1...`);
        const db1 = await getDB(client, "db1"); // Assigns database object
        console.log(`connecting to collection "posts"`);
        const myColl = db1.collection("posts"); // Assigns collection object

        const query = {} // defining an empty query document to define search parameters
        const proj = {} // something to do with comparison/sorting find/findMany methods
        const coll = {} // something to do with the aggregate() method I believe???
        const writeConcern = {} // something to do with specifying write actions of a client
        const readConcern = {} // similar to writeConcern, but for read actions

        /* ========== WRITE OPERATIONS ========== */
        // adds an entry to the posts collection in db1 matching advicePosts[0]
        console.log(await myColl.insertOne(advicePosts[0]));
        
        // adds each element in array advicePosts to posts collection in db1
        console.log(await myColl.insertMany(advicePosts));
        
        // removes an entry from posts collection in db1
        console.log(await myColl.deleteOne(query));

        // removes all entries from posts myColl in db1 matching advicePosts[0]
        console.log(await myColl.deleteMany(query));

        /* ========== READ OPERATIONS ========== */
        // gets entries of a specified myColl
        console.log(`\nRetrieving all entries of 'posts' in db1...`);
        const entries = await myColl.find(query).toArray();

        // gets entry of a specified myColl by searching by ID 
        console.log(`\nRetrieving id '672c064b67e017af3c6b128d' from 'posts' in db1...`);
        query = {_id : new ObjectId("672c064b67e017af3c6b128d")}; /* I don't like having to declare a *NEW* ObjectId when making every ID query */
        const entry = await myColl.find(query);

        // gets entry of a specified myColl by searching by ID 
        console.log(`\nRetrieving first entry in 'posts' in db1...`);
        query = {} /* Empty query */
        entry = await myColl.find(query);

        /*
         * ### Additional Node.js MongoDB driver functions to note ###
         * client.db().collection().distinct(query={}, options={}) -> List
         * - returns a List of distinct objects that match query parameters
         *   - No duplicates!
         * - query parameter consists of user-defined keys and their expected values to pull from 
         * - options parameter consists of "Collations", which are essentially regional rules for ordering and 
         *   comparisons
         *
         * client.db().collection().aggregate() -> Cursor
         * - TODO: Check out the aggregate() object for Pipeline queries!!!!
         * - A Cursor is essentially a document reference that is meant to reduce memory and bandwidth usage
         * - fancy method that pulls documents from database collection and do things such as...
         *   - performs all query operations (?)
         *   - rename fields
         *   - summarize data
         *   - make calculations
         *   - group values as needed
         * - differs from find() methods, which
         *   - selects which documents
         *   - selects which fields to return (with the projection={} parameter)
         */

    } catch (e) { // print out what went wrong
        console.error(e);
    } finally { // close connection
        await client.close();
    }
}

run().catch(console.error);
