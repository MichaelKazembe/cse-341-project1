//  models/database.js

// Import the dotenv package to manage environment variables
const dotenv = require("dotenv").config();

// Import the MongoDB client
const { MongoClient } = require("mongodb");

// MongoDB connection URI from environment variables
const DB_URL = process.env.MONGODB_URL;

// Initialize database instance variable
let database = null;

// Function to initialize the database connection
async function initializeDB(callback) {
  if (database) {
    console.log("Database is already initialized");
    return callback(null);
  }
  try {
    // Create a new MongoDB client and connect to the database
    const client = new MongoClient(DB_URL);
    await client.connect();
    database = client.db(); // Use the default database specified in the URL
    console.log("Connected to MongoDB");
    callback(null);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    callback(err);
  }
}

// Function to get the database instance
function getDatabase() {
  if (!database) {
    throw new Error("Database not initialized. Call initializeDB first.");
  }
  return database;
}

module.exports = {
  initializeDB,
  getDatabase,
};
