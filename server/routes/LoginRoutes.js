const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/LoginModels");
const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "No email is found!" });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // res.json({ token });
    res.status(201).json({ message: "Sign In successfully", token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sign In unsuccessful" });
  }
});

module.exports = router;
