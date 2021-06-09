const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const key = require('../../config/keys').key
const loginValidation = require('../../validations/login');
const signupValidation = require('../../validations/signup')

const User = require('../../models/user');

// router.get('/validate', (req,res) => {
//     let passwordStrength = signupValidation(req.body);

//     if (passwordStrength) {
//         res.json( passwordStrength )
//     } else {
//         return res.status(404).json( passwordStrength );
//     }
// });

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
                    // jwt.sign(payload, secretOrPrivateKey, [options,callback])

                    //payload
                    const payload = { id: user.id, email: user.email }

                    //options will include expiration 
                    const exp = { expiresIn: '10h'}

                    jwt.sign(
                        payload,
                        key,
                        exp,
                        (err,token) => {
                            if (err) throw(jwterrfnc())
                            res.json({
                                success: 'true',
                                token: "Bearer " + token
                            })
                        }
                    )
                    function jwterrfnc() { return {error: `problem signing jwt ${err}`} }

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