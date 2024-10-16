const User = require('../models/userSchema');
const secretKey = 'random-secret';
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(403).json({message: "User not authorised!"});
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        const user = decoded.user;
        console.log(user);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({message: "User not authorised!"});
    }
}

module.exports = authenticate;