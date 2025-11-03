const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// CREATE a new post (Protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({
      title,
      content,
      author: req.user.id  // attach the user ID from token
    });
    await newPost.save();
    res.json({ message: "✅ Post created successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error creating post" });
  }
});

// GET all posts (Public)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// ✅ GET single post by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Error fetching post" });
  }
});

// UPDATE post (Protected)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "✅ Post updated successfully", updatedPost });
  } catch (err) {
    res.status(500).json({ error: "Error updating post" });
  }
});

// DELETE post (Protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "🗑️ Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting post" });
  }
});

module.exports = router;

