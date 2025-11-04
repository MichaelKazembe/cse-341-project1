// routes/index.js

// handle routes
const router = require("express").Router();

// define routes
router.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = router;
