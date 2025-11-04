// controllers/contactsController.js

// Import the database module
const db = require("../models/database");

// const ObjectId = require("mongodb").ObjectId;

// Function to handle fetching ALL contacts
async function getAllContacts(req, res) {
  try {
    // Get the database instance
    const database = db.getDatabase();

    // Fetch contacts from the 'contacts' collection
    const contacts = await database.collection("contacts").find();

    // Convert the cursor to an array
    const contactsArray = await contacts.toArray();

    // Set the response header to application/json
    res.setHeader("Content-Type", "application/json");

    // Send the contacts as a JSON response
    res.status(200).json(contactsArray);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).send("Internal Server Error");
  }
}

// Function to handle fetching a single contact by ID
async function getContactById(req, res) {
  const contactId = req.params.id;

  try {
    const database = db.getDatabase();
    const contact = await database
      .collection("contacts")
      .findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).send("Contact not found");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAllContacts,
  getContactById,
};
