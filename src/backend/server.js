const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const Database = require('./utils.js');

app.use(cors());
app.use(express.json());


const handleQuery =  (url, instance) => {
    app.get(url, async (req, res) => {

        console.log("Server: GET request for received");
        console.log(`Server: Got the following search parameters: `);
        console.log(req.query);

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

        if (instance.getError() !== null) {
            res.status(500).json({ // Changed to handle other additonal sever errors
                message : "Failed retrieving posts :(",
                errMsg : instance.getError()
            });
            console.log("Server: Error retrieving posts from DB.");
        } else {
            res.json({
                message: "posts incoming!",
                payload: instance.getPayload()
            });
            console.log(`Server: ${instance.getPayload().length} posts successfully sent to client.`);
        }
    });
};

// ADVICE INSTANCE 
const advice = new Database("Posts", "advice")
handleQuery('/api/advice', advice);

// RESOURCES INSTANCE
const resources = new Database("Posts", "resources")
handleQuery("/api/resources", resources);

// ADMIN INSTANCE
const limbo = new Database("Posts", "limbo")
handleQuery("/api/limbo", limbo);

app.listen(PORT, () => {
    console.log(`Server: Server started on ${PORT}`)
});

// middleware to catch non-existing routes
app.use( function(req, res, next) {
    res.status(404).json("Error 404: Not found");
    console.log(`Server: User attempted to access ${req.url}`);
});
