const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "cse-341 Project API",
    description:
      "API documentation for the cse-341 project - Contacts RESTful API",
  },
  host: process.env.BASE_URL || "localhost:3000",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = [
  "./server.js",
  "./routes/contacts.js",
  "./routes/index.js",
];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully.");
});
