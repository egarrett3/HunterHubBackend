const jwt = require('jsonwebtoken');
const key = require('../config/keys').key

module.exports = (req,res,next) => {
    const token = req.cookies.token

    if (!token) {
        res.status(403).json({isAuthenticated: false})
    }

    let verify;
    try {
        verify = jwt.verify(token, key)
        next();
    } catch (err) {
        res.status(401).json({isAuthenticated: false})
    }
}