// server.js

// Import the Express framework
const express = require("express");

// Import the body-parser middleware
const bodyParser = require("body-parser");

// Import routes
const homeRoute = require("./routes");
const contactsRoute = require("./routes/contacts");

const mongodb = require("./models/database");

// Create an instance of an Express application
const app = express();
// Define the port the server will listen on
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// define Home page route
app.use("/", homeRoute);

// define `contacts` route for all contacts
app.use("/contacts", contactsRoute);

// 404 Error Handling Middleware
app.use((req, res, next) => {
  const url = req.originalUrl;
  res.status(404).send(`404 error - ${url} not found`);
});

// Initialize MongoDB connection
mongodb.initializeDB((err) => {
  if (err) {
    console.error("Failed to initialize database", err);
    process.exit(1);
  } else {
    // Start the server and listen on the defined port
    app.listen(PORT, () => {
      console.log(`Database Server is listening and running on port:${PORT}`);
    });
  }
});
