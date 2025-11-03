const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// MongoDB connection
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


  const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Hello, Blog Backend is working!");
});

// Use post routes
app.use("/api/posts", postRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


