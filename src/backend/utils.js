const {MongoClient, ObjectId} = require('mongodb');

class Instance{
    uri = "mongodb://localhost:27017"; // URI to mongoDB instacne. Be good to put this as a proxy and/or obfuscate lol
    dbName; // Generic string for identifying DB to interact with
    collName; // Igualmente for colllection name
    payload = []; // Where I'm expecting post data to go. Dunno if I wanna seperate incoming/outgoing payloads but that seems like a good idea
    errorStack = null; // How I'm currently passing along error codes from MongoDB to other sources for debugging atm
    retries = 3; // Maximum number of retry attemps for reading and writing
    delay = 1; // Delay inbetween retries (counts in milliseconds)

    // Constructors
    constructor(dbname, collname) {
        this.client = new MongoClient(this.uri, {
            serverSelectionTimeoutMS: 5000, //Time out for server - set for 5 seconds
        });
        this.dbName = dbname;
        this.collName = collname;
    }

    // Setters
    setDB(name) {
        if (typeof(name) === "string")
            this.dbName = name;
        else
            throw TypeError("Instance: DB name provided unnacceptable.");
    }

    setColl(name) {
        if (typeof(name) === "string")
            this.collName = name;
        else
            throw TypeError("Instance: Collection name provided unnacceptable.");
    }

    reset() {
        if (this.payload.length > 0)
            this.payload = [];
        if (this.errorStack !== null)
            this.errorStack = null;
    }

    async connect(){
        
        console.log("Instance: Attempting to connect to DB...");

        if ((this.collName === undefined) || (this.dbName === undefined))
            throw new Error("Instance: No DB or collection provided. Cannot connect to MongoDB.");

        await this.client.connect();
        console.log(`Instance: Connected to DB!`);

        return await this.client.db(this.dbName).collection(this.collName);
    }

    async pull(params = {}, projs = {}) {
        this.reset();
        try {
            const coll = await this.connect();
            const cursor = coll.find(params).project(projs); // since cursors reference objects...
            console.log(`Instance: Posts pulled!`);
            this.payload = await cursor.toArray(); // and we want to make sure we get all objects

        } catch (e) {
            this.errorStack = e;
            console.error(`Instance: An error occured when retrieving posts from DB:\n${e}`);
        } finally {
            this.client.close();
        }
    }

    async push(data, concern = {}) {
        /*
         * data = array of objects to be inserted
         * concern = object where we can define "write concern" {w, j, wtimeout}
         *  w: (int) how many (specified) instances need to confirm their write
         *  j: (boolean) whether or not write has been written to on-disk journal
         *  wtimeout: (int) representing timelimit on waiting for prev 2 confirms in ms 
         */
        // NOTE: Blindly inserts data. Up to server to sanitize based off route!
        this.reset();
        try {
            if ((typeof(data) !== "object") || (typeof(concern) !== "object"))
                throw TypeError("Instance: push(): arguments are of incorrect type");
            
            if (data.length === 0) throw new Error("Instance: No entries to add.");

            // TODO: handle dirty keys

            console.log("Instance: data received: ");
            console.log(data);

            const coll = await this.connect();
            this.payload = [await coll.insertMany(data)]; // Payload contains result object
            console.log(`Instance: ${this.payload[0].insertedCount} Posts inserted!`);
        } catch (e) {
            this.errorStack = e;
            console.error(`Instance: An error occured when pushing posts to DB:\n${e}`);
        } finally {
            this.client.close();
        }
    }

        // TODO: use db.collection.deleteMany
        // TODO: return results in payload
    async del(params = {}) {
        this.reset();
        try {
            const coll = await this.connect();
            this.payload = [await coll.deleteMany(params)];
            console.log(`Instance: ${this.payload[0].deletedCount} Posts deleted!`);
        } catch (e) {
            this.errorStack = e;
            console.error(`Instance: An error occured trying to remove posts from DB:\n${e}`);
        } finally {
            this.client.close();
        }
    }

    async edit(){
        // TODO: use db.collection.Modify
        // TODO: if entry doesn't exist, throw
    }

    // async retryOperation(operation) {
    //     while (attempt < retries){
    //         try{
    //             return await operation();
    //         } catch (error){
    //             attempt++;
    //             console.error(`Attempt ${attempt} failed: ${error.message}`);
    //             if (attemtp >= retries){
    //                 throw new Error(`Operation failed after ${retries} attempts: ${error.message}`);
    //             }
    //             console.log(`Retrying in ${delay}ms...`);
    //             await new Promise(res => setTimeout(res, delay)); //wait befor trying again
    //         }
    //     }
    // }


    // Getters
    getPayload() { return this.payload; }
    getErrorMsg() { return (this.errorStack !== null) ? this.errorStack.message : null}
}


async function pullReq(instance, req, res) {
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

module.exports = {Instance, pullReq};
