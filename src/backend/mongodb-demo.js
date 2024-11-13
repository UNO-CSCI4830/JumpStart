// ### REFERENCES:
// MongoDB Manual: https://www.mongodb.com/docs/manual/crud/
// NodeJS Drivers Manual: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

const resourcePosts = require("./resourcePosts.js").resourcePosts;
const advicePosts = require("./advicePosts.js").advicePosts;

const {MongoClient, ObjectId} = require('mongodb');

/* ========== READ OPERATIONS ========== */
async function listDBs(client) { // Lists all DBs in a MonboDB instance
    let dbList = await client.db().admin().listDatabases();
    dbList.databases.forEach(db => console.log(`${db.name}`));
    return dbList;
}

async function getDB(client, db_name) { // locates and pings a specified db. Returns DB object
    let db_client = await client.db(db_name);
    await db_client.command({ping: 1});
    console.log("Pinged db1.");
    return db_client;
}

async function getEntries(client, db_name, collection, query={}, proj={}) { // retrieves all entries from a specified collection in a specified db
    let entries = await client.db(db_name).collection(collection).find(query).toArray();
    await entries.forEach(e => console.log(e));
    return entries;
}

async function getEntry(client, db_name, collection, query={}, proj={}) { // pulls an entry from a specified collection in a specified db
    const entry = await client.db(db_name).collection(collection).find(query);
    if (entry === null) {
        console.log("Error: (getEntry) query yielded no results");
        return -1;
    }
    console.log(entry);
    return entry;
}

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

/* ========== WRITE OPERATIONS ========== */
async function addEntry(client, db_name, collection, data={}) { // adds an entry into a collection in a specified db
    const db_client = await client.db(db_name).collection(collection);
    console.log(await db_client.insertOne(data));
    // var entries = await db_client.find().toArray();
    // console.log(entries);
}

async function addEntries(client, db_name, collection, arr=[]) { // takes elements of arr and adds them as entries into a collection in a specified db
    const db_client = await client.db(db_name).collection(collection);
    console.log(await db_client.insertMany(arr));
    // var entries = await db_client.find().toArray();
    // console.log(entries);
}

async function delEntry(client, db_name, collection, query={}) { // removes strictly one entry from a specified collection and db that match query
    const db_client = await client.db(db_name).collection(collection);
    console.log(await db_client.deleteOne(query));
    // var entries = await db_client.find().toArray();
    // console.log(entries);
}

async function delEntries(client, db_name, collection, query={}) { // removes all entries from a specified collection and db that match query
    const db_client = await client.db(db_name).collection(collection);
    console.log(await db_client.deleteMany(query));
    // var entries = await db_client.find().toArray();
    // console.log(entries);
}
/*
 * ### Additional Node.js MongoDB driver functions to note ###
 */

/* ========== MAIN ========== */
async function main() {

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

        /* ========== WRITING TO DB ========== */
        // adds an entry to the posts collection in db1 matching advicePosts[0]
        // await addEntry(client, 'db1', 'posts', advicePosts[0]);
        
        // adds each element in array advicePosts to posts collection in db1
        // await addEntries(client, 'db1', 'posts', advicePosts);
        
        // removes an entry from posts collection in db1
        // await delEntry(client, 'db1', 'posts', advicePosts[0]);
        // await delEntry(client, 'db1', 'posts', {_id: new ObjectId('672c064b67e017af3c6b128d')});

        // removes all entries from posts collection in db1 matching advicePosts[0]
        // await delEntries(client, 'db1', 'posts', advicePosts[0]);

        /* ========== READING FROM DB ========== */
        // function that will list database names in our cluster
        console.log(`Retrieving all DBs...`);
        await listDBs(client); 

        // pings a specified database
        // console.log(`\nPinging db1...`);
        // await getDB(client, "db1"); 

        // gets entries of a specified collection
        // console.log(`\nRetrieving all entries of 'posts' in db1...`);
        // await getEntries(client, "db1", "posts"); 

        // gets entry of a specified collection by searching by ID 
        // console.log(`\nRetrieving id '672c064b67e017af3c6b128d' from 'posts' in db1...`);
        // await getEntry(client, "db1", "posts",
        //     {_id : new ObjectId("672c064b67e017af3c6b128d")});
        /* I don't like having to declare a *NEW* ObjectId when making every ID query */

        // gets entry of a specified collection by searching by ID 
        // console.log(`\nRetrieving first entry in 'posts' in db1...`);
        // await getEntry(client, "db1", "posts"); 

    } catch (e) { // print out what went wrong
        console.error(e);
    } finally { // close connection
        await client.close();
    }
}

main().catch(console.error);
