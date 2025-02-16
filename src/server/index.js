// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

// Initialize the Express application
const app = express();

// Apply middleware
app.use(cors());
app.use(bodyParser.json());



// Default route
app.get('/', (req, res) => {
    res.send("This is the server API page.");
});

// Start the server
app.listen(8000, () => {
    console.log('Server running on port 8000');
});
