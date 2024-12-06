const {MongoClient, ObjectId} = require('mongodb');

class Instance{
    uri = "mongodb://localhost:27017"; // URI to mongoDB instacne. Be good to put this as a proxy and/or obfuscate lol
    dbName; // Generic string for identifying DB to interact with
    collName; // Igualmente for colllection name
    payload = []; // Where I'm expecting post data to go. Dunno if I wanna seperate incoming/outgoing payloads but that seems like a good idea
    errorStack = null; // How I'm currently passing along error codes from MongoDB to other sources for debugging atm

    // Constructors
    constructor(dbname, collname) {
        this.dbName = dbname;
        this.client = new MongoClient(this.uri+`/${this.dbName}`);
        this.collName = collname;
    }

    // ### DEBUGGING
    async connect(){
        try {
            console.log("Attempting to connect to DB...");
            if (this.collName === undefined) throw new Error("Error: No collection provided. Cannot connect to MongoDB.");
            await this.client.connect();
            console.log(`Connected to DB!`);

            const queryColl = await this.client.db().collection(this.collName); // Connect to Collection to retrieve contents
            console.log(queryColl.stats());
        } catch (e) {
            console.error(`An error occurred.\n${e}`);
        } finally {
            this.client.close();
        }
    }
    // #############

    // Setters
    async pull(params = {}, projs = {}) {
        try {
            console.log("Attempting to connect to DB...");

            if (this.collName === undefined) throw new Error("Error: No collection provided. Cannot connect to MongoDB.");

            await this.client.connect();
            console.log(`Connected to DB!`);

            const queryColl = await this.client.db().collection(this.collName); // Connect to Collection to retrieve contents
            const cursor = queryColl.find(params).project(projs); // since cursors reference objects...
            console.log(`Posts pulled!`);
            this.payload = await cursor.toArray(); // and we want to make sure we get all objects
        } catch (e) {
            this.errorStack = e;
            console.error(`An error occured when retrieving posts from DB:\n${e}`);
        } finally {
            this.client.close();
        }
    }

    async push(data) {
    // TODO: write to DB
    return 0;
    }

    // Getters
    getPayload() { return this.payload; }
    getErrorMsg() { return (this.errorStack !== null) ? this.errorStack.message : null}
}


async function receptionist(instance, req, res) {
        console.log("Receptionist: GET request for received");
        console.log(`Receptionist: Got the following search parameters: `);
        console.log(req.data);

        // Parsing incoming parameters object to construct query parameter
        const query = {};

        for (const[key, value] of Object.entries(req.query)) {
            console.log(`\t${key}: ${value}`);
            if (key === "search") {
                query['$text'] = {$search:value};
            } else query[key] = value;
        }

        console.log("Constructed query:");
        console.log(query);

        // Passing query parameter to pull() method
        await instance.pull(query);

        if (instance.getErrorMsg() !== null) {
            res.status(500).json({ // Changed to handle other additonal sever errors
                message : "Failed retrieving posts :(",
                errMsg : instance.getErrorMsg()
            });
            console.log("Receptionist: Error retrieving posts from DB.");
        } else {
            res.json({
                message: "posts incoming!",
                payload: instance.getPayload()
            });
            console.log(`Server: ${instance.getPayload().length} posts successfully sent to client.`);
        }
};

module.exports = {Instance, receptionist};
