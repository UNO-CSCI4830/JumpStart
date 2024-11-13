// ### REFERENCES:
// MongoDB Manual: https://www.mongodb.com/docs/manual/crud/
// NodeJS Drivers Manual: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

const resourcePosts = require("./resourcePosts.js").resourcePosts;
const advicePosts = require("./advicePosts.js").advicePosts;

const {MongoClient} = require('mongodb');

async function listDBs(client) { // Lists all DBs in a MonboDB instance
    let dbList = await client.db().admin().listDatabases();
    dbList.databases.forEach(db => console.log(`${db.name}`));
    return dbList;
}

async function getEntries(collection, query={}, proj={}) { // retrieves all entries from a specified collection in a specified db
    let entries = await collection.find(query).toArray();
    // await entries.forEach(e => console.log(e));
    return entries;
}

async function addEntries(collection, arr=[]) { // takes elements of arr and adds them as entries into specified collection
    console.log(await collection.insertMany(arr));
}

/* ========== MAIN ========== */
async function configurePostsDB() {

    // URI to connect to DB "Posts"
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri); // MongoClient object with details to connect to Posts DB

    try { // attempt to establish a connection
        console.log(`Attempting connection to ${uri}...`);
        await client.connect(); // sit and wait for DB to respond with "promise" object of our connection
        /* Blocks all following execution until DB promise has been received. Think c-s demo from comm networks */
        console.log(`Connected to ${uri}\n`);

        const postsDB = client.db("Posts");

        console.log(`DBs on ${uri}:`);
        await listDBs(client);

        /* ### Building Resources collection in posts DB ### */
        // Defining Resources collection
        const resources = postsDB.collection("resources");

        // adding entries
        console.log("\nAdding documents to resource collection...");
        await addEntries(resources, resourcePosts);
        const resourceColl = await getEntries(resources);

        // Verify creating resource collection
        if (resourceColl.length === resourcePosts.length) {
            console.log("All resource posts were added to \"Resource\" collection");
        } else if (resourceColl.length > resourcePosts.length) {
            console.log("There might be dupicate items from `resourcePosts` in \"Resource\" collection");
        }  else if (resourceColl.length < resourcePosts.length) {
            console.log("Some items from `resourcePosts` were not added to \"Resource\" collection");
        }
        
        /* ### Building Advice collection in posts DB ### */
        // Defining Advice collection
        const advice = postsDB.collection("advice");

        // adding entries
        console.log("\nAdding documents to advice collection...");
        await addEntries(advice, advicePosts);
        const adviceColl = await getEntries(advice);

        // Verify creating advice collection
        if (adviceColl.length === advicePosts.length) {
            console.log("All advice posts were added to \"Advice\" collection");
        } else if (adviceColl.length > advicePosts.length) {
            console.log("There might be dupicate items from `advicePosts` in \"Advice\" collection");
        }  else if (adviceColl.length < advicePosts.length) {
            console.log("Some items from `advicePosts` were not added to \"Advice\" collection");
        }

    } catch (e) { // If something went wrong, say so
        console.error(e);
    } finally { // Regardless, close connection
        await client.close();
    }
}

configurePostsDB().catch(console.error);

export{configurePostsDB};
