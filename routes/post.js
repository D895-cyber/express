const express = require('express');
const router = express.Router();
const Post = require('../model/Post.model');
const auth = require('../middleware/auth');

// Create Post (only if logged in)
router.post('/posts', auth, async (req, res) => {
    const { title, content, tags } = req.body;

    try {
        const post = await Post.create({
            title,
            content,
            tags,
            author: req.user.userId,
        });
        res.status(201).json({ message: 'Post created', post });
    } catch (err) {
        res.status(500).json({ message: 'Error creating post', error: err.message });
    }
});

module.exports = router;
