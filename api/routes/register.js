const {User} = require('../models/user')
const express = require('express');
const router = express.Router();

router.get(`/`, (req, res) => {
    res.json(process.env.SUCCESS_RESPONSE)
})

router.post(`/`, (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        confirm: req.body.confirm,
        isSober: req.body.isSober
    })

    user.save().then(createdUser =>
        res.status(201).json(createdUser)).catch(err => res.status(500).json({
        error: err,
        success: false
    }))
})

module.exports = router
