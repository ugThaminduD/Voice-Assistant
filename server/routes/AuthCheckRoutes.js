const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/LoginModels"); // Ensure the correct path
const router = express.Router();

// Authentication check route
router.get("/check-auth", async (req, res) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ isAuthenticated: false, message: "No token provided" });
    }

    // Verify token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is in .env
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is in .env
    } catch (err) {
      return res.status(401).json({ isAuthenticated: false, message: "Invalid or expired token" });
    }



    // Find user in database
    // const user = await User.findById(decoded.userId);
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(401).json({ isAuthenticated: false, message: "User not found" });
    }

    res.json({ isAuthenticated: true, userId: user._id, email: user.email });

  } catch (error) {
    res.status(500).json({ isAuthenticated: false, message: "Invalid or expired token" });
  }
});

module.exports = router;
