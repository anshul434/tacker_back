const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const connectDb = require("./config/connectDb");

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDb();

// Initialize the Express app
const app = express();

// Middleware setup
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Define routes
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Set the port from environment variable or default to 8080
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
