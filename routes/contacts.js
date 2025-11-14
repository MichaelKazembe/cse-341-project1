// routes/contacts.js

// handle routes
const router = require("express").Router();

// import contacts controller
const contactsController = require("../controllers/contactsController");

// define a Contacts page route
router.get("/", contactsController.getAllContacts);

// define a Contacts page route for a single contact by ID
router.get("/:id", contactsController.getContactById);

// define a route to create a new contact
router.post("/", contactsController.createContact);

// define a route to update a contact by ID
router.put("/:id", contactsController.updateContactById);

// define a route to delete a contact by ID
router.delete("/:id", contactsController.deleteContactById);

module.exports = router;
