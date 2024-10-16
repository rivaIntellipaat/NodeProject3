var express = require('express');
var router = express.Router();
const User = require('../models/userSchema');
const Post = require('../models/postSchema');
var hashPassword = require('../utils/hasher');

/* GET users listing. */
// /users/
router.post('/', async function(req, res, next) {
  const newUser = new User({
    name: req.body.name,
    phone: req.body.phone,
    password: await hashPassword(req.body.password)
  });
  newUser.save(); // Save is a mongoose method

  res.status(200).json({ message: "User Created", userId: newUser.id });
});

router.get('/:id',async (req, res, next)=>{
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong!!");
  }
});

router.post('/:id/post',async (req, res, next)=>{
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const newPost = new Post({
      username: user.name,
      content: req.body.content
    });
    newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong!!");
  }
});

router.get('/:id/posts', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const userPosts = await Post.find({ username: user.name });
    res.status(200).json(userPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Some error occured!" });
  }
});

router.get('/:userId/posts/:postId', async (req, res, next) => {
  try{
    const userId = req.params.userId;
    const postId = req.params.postId;

    const user = await User.findById(userId);
    const userPost = await Post.find({_id: postId, username: user.name});
    res.status(200).json(userPost);
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: "Some error occured!" });
  }
});

module.exports = router;
