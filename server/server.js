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
); // Allow requests from frontend
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//DB connect
// const MONGO_DB_URL='mongodb+srv://thamindud009:1234@cluster0voice.6bywf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0Voice'
const MONGO_DB_URL = process.env.MONGO_DB_URL;

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });

// API Route
const signupRouter = require("./routes/SignupRoutes");
app.use(signupRouter);

const loginsRouter = require("./routes/LoginRoutes");
app.use(loginsRouter);

const authCheckRouter = require("./routes/AuthCheckRoutes");
app.use(authCheckRouter);