// controllers/contactsController.js

// Import the database module
const db = require("../models/database");
// Import ObjectId from MongoDB to handle unique IDs
const { ObjectId } = require("mongodb");

/* ***************************
 *  Function to handle fetching ALL contacts
 * ************************** */
async function getAllContacts(req, res) {
  try {
    // Get the database instance
    const database = db.getDatabase();

    // Fetch contacts from the 'contacts' collection
    const contacts = await database.collection("contacts").find({});

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

/* ***************************
 *  Function to handle fetching a single contact by ID
 * ************************** */
async function getContactById(req, res) {
  const contactId = req.params.id;

  try {
    const database = db.getDatabase();
    const contact = await database
      .collection("contacts")
      .findOne({ _id: new ObjectId(contactId) });

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

/* ***************************
 *  Function to handle creating a new contact
 * ************************** */
async function createContact(req, res) {
  // Validate req.body exists
  if (!req.body) {
    console.error("req.body is undefined");
    return res.status(400).json({
      error:
        "Request body is empty. Make sure to send JSON data with Content-Type: application/json header.",
    });
  }

  const newContact = req.body;

  // Validate required fields
  if (
    !newContact.firstName ||
    !newContact.lastName ||
    !newContact.email ||
    !newContact.favoriteColor ||
    !newContact.birthday
  ) {
    return res.status(400).json({
      error:
        "Missing required fields: firstName, lastName, email, favoriteColor, and birthday are required.",
    });
  }

  try {
    const database = db.getDatabase();

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const result = await database.collection("contacts").insertOne(newContact);

    res.setHeader("Content-Type", "application/json");
    res
      .status(201)
      .json({ message: "Contact created", contactId: result.insertedId });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).send("Internal Server Error");
  }
}

/* ***************************
 *  Function to handle updating a contact by ID
 * ************************** */
async function updateContactById(req, res) {
  const contactId = req.params.id;

  // Validate req.body exists
  if (!req.body) {
    return res.status(400).json({
      error: "Request body is empty. Please provide data to update.",
    });
  }

  try {
    const database = db.getDatabase();

    const contactUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await database
      .collection("contacts")
      .updateOne({ _id: new ObjectId(contactId) }, { $set: contactUpdate });

    if (result.modifiedCount === 0) {
      return res.status(404).send("Contact not found");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Contact updated!" });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).send("Internal Server Error");
  }
}

/* ***************************
 *  Function to handle deleting a contact by ID
 * ************************** */
async function deleteContactById(req, res) {
  const contactId = req.params.id;

  try {
    const database = db.getDatabase();

    const result = await database
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(contactId) });

    if (result.deletedCount === 0) {
      return res.status(404).send("Contact not found");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Contact deleted!" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
};
