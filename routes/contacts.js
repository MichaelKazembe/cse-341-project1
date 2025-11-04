// routes/contacts.js

// handle routes
const router = require("express").Router();

// import contacts controller
const contactsController = require("../controllers/contactsController");

// define a Contacts page route
router.get("/", contactsController.getAllContacts);

// define a Contacts page route for a single contact by ID
router.get("/:id", contactsController.getContactById);

module.exports = router;
