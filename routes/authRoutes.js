const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Admin login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
    return res.status(500).json({ error: "Server not configured properly" });
  }

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ error: "Invalid email" });
  }

  // Compare plain text password with stored plain or hashed password
  const isMatch = password === ADMIN_PASSWORD; // TEMPORARY for testing

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ email: ADMIN_EMAIL }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ message: "✅ Login successful", token });
});

module.exports = router;
