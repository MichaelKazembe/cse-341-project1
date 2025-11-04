// server.js

// Import the Express framework
const express = require("express");

// Import routes
const homeRoute = require("./routes/index");

const mongodb = require("./models/database");
const e = require("express");

// Create an instance of an Express application
const app = express();
// Define the port the server will listen on
const PORT = process.env.PORT || 3000;

// Middleware
app.use("/", homeRoute);

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
