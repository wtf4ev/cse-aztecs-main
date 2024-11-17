const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Create a new post
router.post('/create', async (req, res) => {
  const { content, userId } = req.body;
  const newPost = new Post({ content, userId });
  await newPost.save();
  res.status(201).send({ message: 'Post created successfully' });
});

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('userId');
  res.status(200).send(posts);
});

module.exports = router;
