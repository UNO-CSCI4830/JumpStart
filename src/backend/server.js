const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const {MongoClient, ObjectId} = require('mongodb');


app.use(cors());
app.use(express.json());

/*
 * NOTE: How I managed to get this unholy abomination working:
 * 0. Shut down Node and React stuff
 * 1. added proxy field to package.json to have relevant HTTP requests to DB be directed there
 * 2. deleted package-lock.json
 * 3. deleted node_modules.json
 * 4. re-installed npm `npm install`
 */

class Database {
    uri = "mongodb://localhost:27017"; // URI to mongoDB instacne. Be good to put this as a proxy and/or obfuscate lol
    dbName = ""; // Generic string for identifying DB to interact with
    collName = ""; // Igualmente for colllection name
    payload = []; // Where I'm expecting post data to go. Dunno if I wanna seperate incoming/outgoing payloads but that seems like a good idea
    errorStack = null; // How I'm currently passing along error codes from MongoDB to other sources for debugging atm
    params = {}; // Query parameters
    projs = {}; // Field filtering parameters unique to the find and findAll calls

    constructor(dbname, collname) {
        this.client = new MongoClient(this.uri);
        this.dbName = dbname;
        this.collName = collname;
    }

    // Setters
    async query() {
        try {
            console.log("Attempting to connect to DB...");
            await this.client.connect(); // Connect to MongoDB instance
            console.log(`Connected to DB!`);
            const queryColl = await this.client.db(this.dbName).collection(this.collName); // Connect to Collection to retrieve contents
            this.payload = await queryColl.find(this.params,this.projs).toArray();
        } catch (e) {
            this.errorStack = e;
            console.error(`An error occured when connecting ot DB:\n${e}`);
        } finally {
            this.client.close();
        }
    }

    // Getters
    getPayload() { return this.payload; }
    getError() { return this.errorStack; }
}

app.get('/api/advice', async (req, res) => {

    const advice = new Database("Posts", "advice");
    await advice.query();
    const advicePosts = advice.getPayload();

    // A simple error statement just in case a DB fails
    if (advicePosts.length === 0) {
        res.json({
            message : "Failed retrieving advice posts :(",
            payload : advicePosts.getError()
        });
        console.log("Error retrieving advice posts from DB.");
    } else {
        res.json({
            message: "Advice posts incoming!",
            payload: advicePosts
        });
        // res.send("Server.js Demo");
        console.log("GET request for advice received");
    }
});

app.get('/api/resources', (req, res) => {
    res.json({message: "Resources posts!"});
    // res.send("Server.js Demo");
    console.log("GET request for resources received");
});

app.get('/api/admin', (req, res) => {
    res.json({message: "Admin stuff!"});
    // res.send("Server.js Demo");
    console.log("GET request for admin received");
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
});

// middleware to catch non-existing routes
app.use( function(req, res, next) {
    res.status(404).json("Error 404: Not found");
    console.log(`User attempted to access ${req.url}`);
});
