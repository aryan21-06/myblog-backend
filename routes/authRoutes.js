const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // plain text in .env
const JWT_SECRET = process.env.JWT_SECRET;

// Hash admin password once at startup
const hashedPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);

// Admin login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ error: "Invalid email" });
  }

  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ email: ADMIN_EMAIL }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ message: "✅ Login successful", token });
});

module.exports = router;
