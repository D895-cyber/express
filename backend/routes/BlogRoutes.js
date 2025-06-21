const express = require('express')
const router = express.Router();
const User = require('../model/User.model')
const Post = require('../model/Post.model');
const Comment = require('../model/comment.model');
const authMiddleware = require('../middleware/auth')
let validator = require('validator');

router.post('/users',authMiddleware, async (req, res) => {
    const { name, email, bio } = req.body;
    if (!validator.isEmail(email)) {
        return res.status(400).json({ status: false, message: "Please enter a valid email" });
    }
    const user = await User.create(req.body);
    res.json({ status: true, user }); 
});


router.post('/posts',authMiddleware,async(req,res)=>{
    try{
        console.log('User data from token:', req.user);
        const postData = {
            ...req.body,
            author: req.user.userId
        };
        const post = await Post.create(postData);
        res.status(201).json({ status: true, post });
    }catch(err){
        console.log(err);
        res.status(400).json({ status: false, message: "Error creating post" });
    }
})

router.get('/posts', async(req,res)=>{
    const posts = await Post.find().populate('author')
    res.status(200).json({posts}) 
})

router.get('/posts/:id',authMiddleware,async(req,res)=>{
    const post = await Post.findById(req.params.id).populate('author');
    const comments = await Comment.find({ post: req.params.id }).populate('user');
    res.json({status:true, post, comments})
});

router.post('/posts/:postId/comments', authMiddleware, async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.userId; // Correctly access the userId from the decoded JWT

        if (!content) {
            return res.status(400).json({ status: false, message: 'Content is required' });
        } 

        const comment = await Comment.create({
            content,
            user: userId,
            post: req.params.postId
        });

        res.status(201).json({ status: true, comment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
});

router.delete('/posts/:id', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ status: false, message: 'Post not found' });
        }

        if (post.author.toString() !== req.user.userId) {
            return res.status(403).json({ status: false, message: 'User not authorized to delete this post' });
        }

        await post.deleteOne();
        await Comment.deleteMany({ post: req.params.id });

        res.json({ status: true, message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
});

router.get('/comments',authMiddleware,async(req,res)=>{
    try{
        const comment = await Comment.find().populate('user').populate('post');
        res.status(201).json({status:true, comment})
    }catch(err){
        res.status(500).json({status:false,message:err.message})
    }
    
})


module.exports = router