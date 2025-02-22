// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const session = require('express-session');  // <-- Import express-session



// Initialize the Express application
const app = express();



// Apply middleware
app.use(cors());
app.use(bodyParser.json());

//set up sess
app.use(session({
    secret: 'path4u-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Set secure: true if using HTTPS in production
}));


// Middleware to serve static files from 'client' directory
app.use(express.static(path.join(__dirname, "../client")));

// Serve HTML pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../client/views/home.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "../client/views/register.html")));
app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "../client/views/dashboardV2.html")));

let users = {};

let coursesInfo = {};

function saveUserCourses(email, apiResponse) {
    // Check if the response contains recommendations
    if (apiResponse && apiResponse.recommendations) {
        coursesInfo[email] = apiResponse.recommendations;
        console.log(`Recommendations for ${email} saved successfully:`, coursesInfo[email]);
    } else {
        console.error("Invalid API response. Cannot save recommendations.");
    }
}



app.post("/submit-registration", async (req, res) => {
    const { username, email, password, YoB, gender, LoE_DI, course_field_mapping } = req.body;

    if (users[email]) {
        return res.status(400).json({ error: "User already exists." });
    }

    // ai 
    const data = { LoE_DI, YoB, gender, course_field_mapping }

    console.log('data to ai', data);

    try {
        // Forward registration data to the Flask API
        const response = await axios.post('http://127.0.0.1:5000/predict', data, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log("AI response:", response.data);

        // req.session.user = users[email];
        saveUserCourses(email, response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed." });
    }


    users[email] = { username, email, password, YoB, gender, LoE_DI, course_field_mapping };
    req.session.user = users[email];
    // save the session
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

    req.session.user = users[email];
    console.log(`password: ${password}, Email: ${email}`);
    res.json({ success: true, message: "Signin successful", user: users[email] });
});

// Endpoint to log out
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: "Logout failed." });
        }
        res.json({ success: true, message: "Logged out successfully." });
    });
});

// Endpoint to check if a user is signed in
app.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "User is not signed in." });
    }
    res.json({ user: req.session.user });
});


// Endpoint to get user courses
app.get('/user-courses', (req, res) => {
    // Check if the user is signed in
    if (!req.session.user) {
        return res.status(401).json({ error: 'User is not signed in.' });
    }

    // Retrieve the email from the session user object
    const email = req.session.user.email;

    // Check if courses exist for this user
    if (coursesInfo[email]) {
        return res.json({ courses: coursesInfo[email] });
    } else {
        return res.json({ courses: [] });
    }
});

// get data for user
app.get("/entries", async (req, res) => { res.send(users); });

// Start the server
app.listen(8000, () => {
    console.log('Server running on port 8000');
});
