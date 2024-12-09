// Import required packages
const express = require('express');
const cors = require("cors");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

const queries = require('./queries');

app.use(cors());
app.use(express.json());
app.use('/api', queries)

const server = app.listen(PORT, () => {
    console.log(`Server: Server started on ${PORT}`)
});

// middleware to catch non-existing routes
app.use(function(req, res, next) {
    res.status(404).json({message: "Error 404: Not found"});
    console.log(`Server: User attempted to access ${req.url}`);
});

module.exports = {app};
