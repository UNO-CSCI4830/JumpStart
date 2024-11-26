const { MongoClient } = require('mongodb');

async function createDatabase() {
    // Connection URI for MongoDB
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Specify the database name; MongoDB will create it when you add a document
        const db = client.db("myNewDatabase"); // Change "myNewDatabase" to your desired database name

        // Specify the collection name
        const collection = db.collection("myNewCollection"); // Change "myNewCollection" to your desired collection name

        // Insert a sample document to create the database and collection
        const result = await collection.insertOne({ name: "Sample Document", createdAt: new Date() });

        console.log("Database and collection created with the following document ID:", result.insertedId);
    } catch (e) {
        console.error("An error occurred while creating the database:", e);
    } finally {
        // Ensure that the client will close when you finish or if there's an error
        await client.close();
    }
}

// Run the function to create the database
createDatabase().catch(console.error);
