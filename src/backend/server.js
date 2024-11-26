const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const Database = require('./utils.js');

app.use(cors());
app.use(express.json());

// ADVICE INTERFACE
app.get('/api/advice', async (req, res) => {

    const advice = new Database("Posts", "advice");
    await advice.query();
    const posts = advice.getPayload();

    // A simple error statement just in case a DB fails
    if (posts.getError() !== null) { // would love to use the advice's getter in the response object
        res.json({
            message : "Failed retrieving advice posts :(",
            payload : advice.getError()
        });
        console.log("Error retrieving advice posts from DB.");
    } else {
        res.json({
            message: "Advice posts incoming!",
            payload: posts
        });
        console.log("GET request for advice received");
    }
});

// RESOURCES INTERFACE
app.get('/api/resources', async (req, res) => {

    const resources = new Database("Posts", "resources");
    await resources.query();
    const posts = resources.getPayload();

    if (posts.length === 0) {
        res.json({
            message : "Failed retrieving resources posts :(",
            payload : posts.getError()
        });
        console.log("Error retrieving resource posts from DB.");
    } else {
        res.json({
            message: "resource posts incoming!",
            payload: posts 
        });
        console.log("GET request for resources received");
    }
});

// ADMIN INTERFACE
app.get('/api/admin', async (req, res) => {

    const limbo = new Database("Posts", "resources");
    await limbo.query();
    const posts = limbo.getPayload();

    // A simple error statement just in case a DB fails
    if (posts.length === 0) {
        res.json({
            message : "Failed retrieving purgatory :(",
            payload : limbo.getError()
        });
        console.log("Error retrieving purgatory from DB.");
    } else {
        res.json({
            message: "Purgatory incoming!",
            payload: posts 
        });
        console.log("GET request for admin received");
    }
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
});

// middleware to catch non-existing routes
app.use( function(req, res, next) {
    res.status(404).json("Error 404: Not found");
    console.log(`User attempted to access ${req.url}`);
});
