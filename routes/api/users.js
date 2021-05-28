const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require('../../models/user');

router.post('/register', (req, res) => {

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
                        newUser.save().then((user) => res.json(user));
                    }
                })
            })
        }
    });

});

router.post('/login',(req,res) => {

    User.findOne({ email: req.body.email}).then(user => {
        if (!user) {
            res
              .status(404)
              .json({ email: 'the user does not exist'})
        } else {
            bcrypt.compare(user.password,req.body.password).then((isMatch) => {
                if (isMatch) {
                    payload = { id: user.id, username: user.username }

                    // jwt.sign(payload, secretOrPrivateKey, [options,callback])


                    jwt.sign(
                        payload,
                    )

                } else {
                    res
                      .status(404)
                      .json({ password: 'incorrect password'})
                }
            })
        }
    })

})

module.exports = router;