// ### REFERENCES:
// MongoDB Manual: https://www.mongodb.com/docs/manual/crud/
// NodeJS Drivers Manual: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/

const {MongoClient, ObjectId} = require('mongodb');

/* ========== MAIN ========== */
async function runResources() {

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
        const resources = await postsDB.collection("resources");

        // defining rw parameter documents
        var query = {};
        var proj = {};

        // Retrieves all the docs from the resource collection
        const resourcePosts = await retryOperation(() => resources.find(query, proj).toArray(), maxRetries, retryDelay);
        console.log(`Current size of resources: ${resourcePosts.length}`);

        // Filterig resources by catergory(working progress)
        const categoryQuery = { category: 'Technology' }; // Example query
        const categoryPosts = await retryOperation(() => resources.find(categoryQuery, proj).toArray(), maxRetries, retryDelay);
        console.log(`Resources in 'Technology' category: ${categoryPosts.length}`);
        
        // doing some quick confirmations
        console.log(`Current size of resources: ${resourcePosts.length}`);
        /*
         * Contents of a resource document:
         *   _id -> new ObjectId
         *     - dunno if we need this since id has already been defined
         *   id -> int
         *   category -> String
         *   title -> String
         *   description -> String
         *   link -> href String
         */
    } catch (e) { // print out what went wrong
        console.error(e);
    } finally { // close connection
        await client.close();
    }
}

// Function for retrying operations
async function retryOperation(operation, retries, delay) {
    let attempt = 0;
    while (attempt < retries) {
        try {
            return await operation();
        } catch (error) {
            attempt++;
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt >= retries) {
                throw new Error(`Operation failed after ${retries} attempts: ${error.message}`);
            }
            console.log(`Retrying in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay)); // Wait before retrying
        }
    }
}


runResources().catch(console.error);
