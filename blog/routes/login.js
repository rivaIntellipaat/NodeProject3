var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

const secretKey = 'random-secret';

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async function(req, res, next) {
  const { userid, password } = req.body;
    const user = await User.findById(userid);
    if (user == null) {
        return res.status(404).json({ message: "User not found" });
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "Something went wrong!" });
        } else if (result) {
            console.log(result);
            const token = jwt.sign({ user }, secretKey, { expiresIn: '1h'});
            // return res.status(200).json({token: token});
            res.cookie('token', token);
            res.redirect('/profile');
        } else {
            console.log("Unauthorised");
            return res.status(403).json({ message: "Unauthorised user" });
        }
    });

});

module.exports = router;
