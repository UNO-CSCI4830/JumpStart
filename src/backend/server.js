const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

/*
 * NOTE: How I managed to get this unholy abomination working:
 * 0. Shut down Node and React stuff
 * 1. added proxy field to package.json to have relevant HTTP requests to DB be directed there
 * 2. deleted package-lock.json
 * 3. deleted node_modules.json
 * 4. re-installed npm `npm install`
 */

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({message: "Hello from server.js!"});
    // res.send("Server.js Demo");
    console.log("GET request for API received");
});

app.get('/advice', (req, res) => {
    res.json({message: "Advice posts!"});
    // res.send("Server.js Demo");
    console.log("GET request for advice received");
});

app.get('/resources', (req, res) => {
    res.json({message: "Resources posts!"});
    // res.send("Server.js Demo");
    console.log("GET request for resources received");
});

app.get('/admin', (req, res) => {
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
