// ### REFERENCES:
// MongoDB Manual: https://www.mongodb.com/docs/manual/crud/
// NodeJS Drivers Manual: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

const resourcePosts = require("./data/resourcePosts.js").resourcePosts;
const advicePosts = require("./data/advicePosts.js").advicePosts;
const pendingPosts = require("./data/AdminData.js").pendingPosts;
module.exports = { addEntries, getEntries, deleteEntries, lookEntries };

const { MongoClient } = require('mongodb');

// Lists all DBs in a MongoDB instance
async function listDBs(client) {
    let dbList = await client.admin().listDatabases(); // Use admin() to access listDatabases
    dbList.databases.forEach(db => console.log(`${db.name}`));
    return dbList;
}


// Retrieves all entries from a specified collection in a specified db
async function getEntries(collection) {
    try {
        const entries = await collection.find().toArray();
        return entries;
    } catch (error) {
        console.error('Error retrieving entries:', error);
    }
}

// Takes elements of arr and adds them as entries into the specified collection
async function addEntries(collection, arr = []) {
    try {
        const result = await collection.insertMany(arr);
        console.log(`${result.insertedCount} entries added.`);
    } catch (error) {
        console.error('Error adding entries:', error);
    }
}

// Deletes entries based on the query criteria
async function deleteEntries(collection, query = {}) {
    try {
        const result = await collection.deleteMany(query);
        console.log(`${result.deletedCount} entries deleted.`);
        return result;
    } catch (error) {
        console.error('Error deleting entries:', error);
    }
}

// Retrieves entries with specific keywords (search)
async function lookEntries(collection, query) {
    try {
        const entries = await collection.find(query).toArray();
        return entries;
    } catch (error) {
        console.error('Error retrieving entries:', error);
    }
}

/* ========== MAIN ========== */

async function configurePostsDB() {
    // URI to connect to DB "Posts"
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri); // MongoClient object with details to connect to Posts DB

    try { // attempt to establish a connection
        console.log(`Attempting connection to ${uri}...`);
        await client.connect(); // wait for DB to respond with "promise" object of our connection
        console.log(`Connected to ${uri}\n`);

        const postsDB = client.db("Posts");

        // Listing databases (NOTE: Updated to correct function for MongoDB 4+)
        console.log(`DBs on ${uri}:`);

        // Correct method to list databases
        const dbList = await client.db().command({ listDatabases: 1 });
        console.log('DBs on mongodb://localhost:27017/:', dbList.databases);

        // ### Building Limbo collection in posts DB ###
        const limbo = postsDB.collection("limbo");

        // Adding entries to the limbo collection
        console.log("\nAdding documents to limbo collection...");
        await addEntries(limbo, pendingPosts);
        const limboColl = await getEntries(limbo);

        // Verify creating limbo collection
        if (limboColl.length === pendingPosts.length) {
            console.log("All pending posts were added to \"Limbo\" collection");
        } else if (limboColl.length > pendingPosts.length) {
            console.log("There might be duplicate items from `pendingPosts` in \"Limbo\" collection");
        } else if (limboColl.length < pendingPosts.length) {
            console.log("Some items from `pendingPosts` were not added to \"Limbo\" collection");
        }

        // Example: Deleting entries from limbo collection with a query
        console.log("\nDeleting documents from limbo collection where status is 'pending'...");
        const deleteResult = await deleteEntries(limbo, { status: "pending" });
        console.log(`${deleteResult.deletedCount} documents were deleted from limbo collection`);

        // Example: Looking for entries in the limbo collection
        console.log("\nLooking for documents in limbo collection with 'status' as 'approved'...");
        const lookResult = await lookEntries(limbo, { status: "approved" });
        console.log(`Found ${lookResult.length} documents with 'approved' status in limbo collection`);

    } catch (e) { // If something went wrong, say so
        console.error(e);
    } finally { // Regardless, close connection
        await client.close();
    }
}
