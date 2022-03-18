const {User} = require('../models/user')
const express = require('express');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const crypto = require('crypto');
const router = express.Router();

const api = process.env.API_URL

// passport.use(new LocalStrategy(
//     function (username, password, done) {
//         User.findOne({ email: username }, function (err, user) {
//             if (err) { return done(err); }
//             if (!user) { return done(null, false); }
//             if (!user.verifyPassword(password)) { return done(null, false); }
//             return done(null, user);
//         });
//     }
// ));
//
// router.post(`/login`,
//     passport.authenticate('local', {
//         successRedirect: `/`,
//         failureRedirect: `/login2`
//     }));

router.get(`${api}/login`, (req, res) => {
    res.json(process.env.SUCCESS_RESPONSE)
})

router.get(`${api}/register`, (req, res) => {
    res.json(process.env.SUCCESS_RESPONSE)
})

router.post(`${api}/register`, async (req, res) => {
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        isSober: req.body.isSober
    })

   await user.save()


    // user.save().then(createdUser =>
    //     res.status(201).json(createdUser)).catch(err => res.status(500).json({
    //     error: err,
    //     success: false
    // }))
})

module.exports = router
