var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

const secretKey = 'random-secret';

router.get('/', (req, res) => {
    const user = req.user;
    res.render('profile', {user});
});

module.exports = router;
