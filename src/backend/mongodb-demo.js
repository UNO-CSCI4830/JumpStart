const {MongoClient} = require('mongodb');

async function listDatabases(client) {
    let databaseList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    databaseList.databases.forEach(db => console.log(` - ${db.name}`));

    // Pulls the db I just made
    let db = databaseList.databases[2].name;
    console.log("Database 0: ", db);
}

async function main() {
    // URI connection details for client to communicate with DB
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri); // creates MongoClient instance
    try { // attempt to establish a connection
        await client.connect(); // sit and wait for DB to respond with "promise"
        /* Blocks all following execution until DB promise has been received. Think c-s demo from comm networks */
        await listDatabases(client); // function that will list database names in our cluster
    } catch (e) { // print out what went wrong
        console.error(e);
    } finally { // close connection
        await client.close();
    }
}

main().catch(console.error);
