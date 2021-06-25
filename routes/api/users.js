const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const key = require('../../config/keys').key
const loginValidation = require('../../validations/login');
const signupValidation = require('../../validations/signup')

const User = require('../../models/user');

router.post('/register', (req, res) => {

    const errors = signupValidation(req.body);

    if (errors) {
        return res.status(404).json(errors);
    }
    
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res
                    .status(404)
                    .json({ email: 'a user with that email address exists already' });
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            
            bcrypt.genSalt(10, (err, salt) => {
                if (err) { throw err }
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err
                    } else {
                        newUser.password = hash;
                        newUser.save().then((user) => {
                            sendToken(user,res)
                            return res.json(user)
                        });
                    }
                })
            })
        }
    });

});

router.post('/login',(req,res) => {
    
    const errors = loginValidation(req.body);
   
    if (errors) {
        return res.status(404).json(errors)
    }
    
    User.findOne({ email: req.body.email}).then(user => {
        if (!user) {
            res
              .status(404)
              .json({ email: 'this email does not exist'})
        } else {
            bcrypt.compare(req.body.password,user.password).then((isMatch) => {
                if (isMatch) {
                    sendToken(user,res);
                    res.json({'user': user.username,'email': user.email});
                } else {
                    res
                      .status(404)
                      .json({ password: 'incorrect password'})
                }
            })
        }
    })
})

const sendToken = (user,res) => {
    const payload = { id: user.id, email: user.email, username: user.username };

    //options will include expiration
    const exp = { expiresIn: 86400 };

    const token = jwt.sign(payload, key, exp);

    // set token in cookie, httpOnly/for server eyes only
    try {
        res.cookie("token", token, {
            expires: new Date(Date.now() + exp),
            secure: false,
            httpOnly: true,
        });
    } catch (err) {
        res.status(500).json({'error': 'unable to sign token'})
    }
}

module.exports = router;