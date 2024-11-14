// ### REFERENCES:
// MongoDB Manual: https://www.mongodb.com/docs/manual/crud/
// NodeJS Drivers Manual: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

const {MongoClient, ObjectId} = require('mongodb');

/* ========== READ OPERATIONS ========== */
async function listDBs(client) { // Lists all DBs in a MonboDB instance
    let dbList = await client.db().admin().listDatabases();
    dbList.databases.forEach(db => console.log(`${db.name}`));
    return dbList.databases;
}

async function getDB(client, db_name) { // locates and pings a specified db. Returns DB object
    let db_client = await client.db(db_name);
    await db_client.command({ping: 1});
    console.log("Pinged db1.");
    return db_client;
}

async function getEntries(collection, query={}, proj={}) { // retrieves all entries from a specified collection in a specified db
    let entries = await collection.find(query,proj).toArray();
    return entries;
}

async function getEntry(collection, query={}, proj={}) { // pulls an entry from a specified collection in a specified db
    const entry = await collection.find(query);
    if (entry === null) {
        console.log("Error: (getEntry) query yielded no results");
        return 1;
    }
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
async function addEntry(collection, data={}) { // adds an entry into a collection in a specified db
    console.log(await collection.insertOne(data));
}

async function addEntries(collection, arr=[]) { // takes elements of arr and adds them as entries into a collection in a specified db
    console.log(await collection.insertMany(arr));
}

async function delEntry(collection, query={}) { // removes strictly one entry from a specified collection and db that match query
    console.log(await collection.deleteOne(query));
}

async function delEntries(collection, query={}) { // removes all entries from a specified collection and db that match query
    console.log(await collection.deleteMany(query));
}
/*
 * ### Additional Node.js MongoDB driver functions to note ###
 */

/* ========== MAIN ========== */
async function main() {

    // URI connection details for client to communicate with DB
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri); // creates MongoClient instance

    try { // attempt to establish a connection

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

        /*
         * TODO:
         * - Figure out how to update existing documents
         *   - changes are saved to DB (likes/hearts)
         * - Play around with db.collections.aggregate() method!
         *   - DB to React Component pipeline is real and it comes for us all guys
         * - Play around with find()'s projection parameter
         *
         * - !!! Client Authentication for read and write !!!
         *   - will need a users DB
         *     - Admin collection with permissions to delete?
         *     - users collection for authorizing???
         *
         * - Maybe a limbo DB, since we plan on vetting submissions prior to them being live?
         */

        console.log(`Attempting connection to ${uri}...`);
        await client.connect(); // sit and wait for DB to respond with "promise"
        /* Blocks all following execution until DB promise has been received. Think c-s demo from comm networks */
        console.log(`Connected to ${uri}\n`);

        // define database object
        const postsDB = await client.db("Posts");

        // define collection objects
        const resources = await postsDB.collection("resources");
        const advice = await postsDB.collection("advice");

        var resourcePosts = await getEntries(resources);
        var resourcePosts = await getEntries(resources);

        // doing some quick confirmations
        console.log(`Current size of resources: ${resourcePosts.length}`);
        /*
         * Contents of a resource document:
         * _id
         * Title
         */
        console.log(`Current size of advice: ${(await getEntries(advice)).length}`);

    } catch (e) { // print out what went wrong
        console.error(e);
    } finally { // close connection
        await client.close();
    }
}

main().catch(console.error);
