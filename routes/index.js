// routes/index.js

// handle routes
const router = require("express").Router();

// import contacts route
const contactsRoute = require("./contacts");

// define a Home page route
router.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = router;
