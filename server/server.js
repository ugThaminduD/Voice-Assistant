const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Example API Route
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});
