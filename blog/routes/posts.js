var express = require('express');
var router = express.Router();
const Post = require('../models/postSchema');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const allPosts = await Post.find();
  res.status(200).send(allPosts);
});

module.exports = router;
