const express = require("express");
// Create an instance of an Express application
const app = express();
// Define the port the server will listen on
const PORT = process.env.PORT || 3000;

// Middleware
app.use("/", require("./routes"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
