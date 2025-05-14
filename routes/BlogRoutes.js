const express = require('express')
const router = express.Router();
const User = require('../model/User.model')
const Post = require('../model/Post.model');
const Comment = require('../model/comment.model');
let validator = require('validator');

router.post('/users', async (req, res) => {
    const { name, email, bio } = req.body;
    if (!validator.isEmail(email)) {
        return res.status(400).json({ status: false, message: "Please enter a valid email" });
    }
    const user = await User.create(req.body);
    res.json({ status: true, user }); 
});


router.post('/posts',async(req,res)=>{
    try{
        const post = await Post.create(req.body);
        res.status(201).json({ status: true, post }); //response 
    }catch(err){
        console.log(err);
        res.status(400).json({ status: false});
    }
})

router.get('/posts',async(req,res)=>{
    const posts = await Post.find().populate('author')
    res.status(201).json({posts}) 
})

router.get('/posts/:id',async(req,res)=>{
    const posts = await Post.findById(req.params.id).populate('author');
    const comments = await Comment.find({posts:req.params.id}).populate('User');
    res.json({status:true,posts,comments})
});

router.post('/posts/:postId/comments', async (req, res) => {
    const { content, user } = req.body;
    const comment = await Comment.create({ content, user, post: req.params.postId });
    res.status(201).json({ status: true, comment });
});
// router.get('/comments', async (req, res) => { //comments login signup 
//     try {
//         const comments = await Comment.find()
//             .populate('user')
//             .populate('post');

//         res.status(200).json({ status: true, comments });
//     } catch (err) {
//         res.status(500).json({ status: false, message: err.message });
//     }
// });

router.get('/comments',async(req,res)=>{
    try{
        const comment = await Comment.find().populate('user').populate('post');
        res.status(201).json({status:true, comment})
    }catch(err){
        res.status(500).json({status:false,message:err.message})
    }
    
})


module.exports = router