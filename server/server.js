const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);                                         // Allow requests from frontend
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//DB connect
// const MONGO_DB_URL='mongodb+srv://born_to_battle:BTB69@borntobattle.0k5sqj7.mongodb.net/BornToBattle?retryWrites=true&w=majority'
// const MONGO_DB_URL= process.env.MONGO_DB_URL

// mongoose
//   .connect(MONGO_DB_URL)
//   .then(() => {
//     console.log("DB connected");
//   })
//   .catch((err) => {
//     console.log("DB connection error", err);
//   });

// app.get("/", (req, res) => {
//   res.send("Backend is running...");
// });

// // Example API Route
// app.get("/api/message", (req, res) => {
//   res.json({ message: "Hello from the backend!" });
// });
