const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/user');

router.post('/signup',(req,res) => {
    debugger
    User.findOne({ email: req.body.email }).then((user)=> {
        if (user) { 
            return res
                .status(404)
                .json({ email: 'a user with that email address exists already'})
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.password
            })
        }

        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(newUser.password,salt, (err,hash) => {
                if (err) throw (err)
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user));
            })
        })

    })
    
})
