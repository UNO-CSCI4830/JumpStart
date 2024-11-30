const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const Database = require('./utils.js');

app.use(cors());
app.use(express.json());

// ADVICE INTERFACE
// Wonder if I can integrate this into Database class as a method somehow? These GETs are repeated code
app.get('/api/advice', async (req, res) => {

    console.log("Server: GET request for advice received:");
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
    const advice = new Database("Posts", "advice");
    await advice.pull(query);

    // A simple error statement just in case a DB fails
    if (advice.getError() !== null) { // would love to use the advice's getter in the response object
        res.json({
            message : "Failed retrieving advice posts :(",
            errMsg : advice.getError()
        });
        console.log("Server: Error retrieving advice posts from DB.");
    } else {
        res.json({
            message: "Advice posts incoming!",
            payload: advice.getPayload()
        });
        // console.log(advice.getPayload());
        console.log(`Server: ${advice.getPayload().length} advice posts successfully sent to client.`);
    }
});

// RESOURCES INTERFACE
app.get('/api/resources', async (req, res) => {

    console.log("Server: GET request for resources received");
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
    const resources = new Database("Posts", "resources");
    await resources.pull(query);

    if (resources.getError() !== null) {
        res.json({
            message : "Failed retrieving resources posts :(",
            errMsg : resources.getError()
        });
        console.log("Server: Error retrieving resource posts from DB.");
    } else {
        res.json({
            message: "resource posts incoming!",
            payload: resources.getPayload()
        });
        console.log(`Server: ${resources.getPayload().length} resources posts successfully sent to client.`);
    }
});

// ADMIN INTERFACE
app.get('/api/admin', async (req, res) => {

    console.log("GET request for admin received");

    const limbo = new Database("Posts", "resources");
    await limbo.pull();

    // A simple error statement just in case a DB fails
    if (limbo.getError() !== null) {
        res.json({
            message : "Failed retrieving purgatory :(",
            errMsg : limbo.getError()
        });
        console.log("Server: Error retrieving purgatory from DB.");
    } else {
        res.json({
            message: "Purgatory incoming!",
            payload: limbo.getPayload()
        });
        console.log(`Server: ${limbo.getPayload().length} purgatory posts successfully sent to client.`);
    }
});

app.listen(PORT, () => {
    console.log(`Server: Server started on ${PORT}`)
});

// middleware to catch non-existing routes
app.use( function(req, res, next) {
    res.status(404).json("Error 404: Not found");
    console.log(`Server: User attempted to access ${req.url}`);
});
