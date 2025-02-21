// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// Initialize the Express application
const app = express();



// Apply middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware to serve static files from 'client' directory
app.use(express.static(path.join(__dirname, "../client")));

// Serve HTML pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../client/views/home.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "../client/views/register.html")));
app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "../client/views/dashboardV2.html")));

let users = {};

app.post("/submit-registration", (req, res) => {
    const { username, email, password, yob, gender, degree, interest } = req.body;

    if (users[email]) {
        return res.status(400).json({ error: "User already exists." });
    }

    users[email] = { username, email, password, yob, gender, degree, interest };
    console.log(`New User Registered: ${JSON.stringify(users[email])}`);
    res.json({ success: true, message: "User registered successfully", user: users[email] });
});

app.post("/submit-signin", (req, res) => {
    const { email, password } = req.body;

    if (!users[email]) {
        return res.status(401).json({ error: "User not found." });
    }

    if (users[email].password !== password) {
        return res.status(401).json({ error: "Invalid password." });
    }

    console.log(`password: ${password}, Email: ${email}`);
    res.json({ success: true, message: "Signin successful", user: users[email] });
});

// Start the server
app.listen(8000, () => {
    console.log('Server running on port 8000');
});
