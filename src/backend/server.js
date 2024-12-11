// Import required packages
const express = require('express');
const cors = require("cors");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

const queries = require('./queries');

// Middleware setup
app.use(cors());
app.use(express.json()); 
app.use('/api', queries);  

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server: Server started on port ${PORT}`);
});

// Middleware to handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Error 404: Not found" });
    console.log(`Server: User attempted to access ${req.url}`);
});

module.exports = { server, app }; 
