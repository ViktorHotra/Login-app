const {User} = require('../models/user')
const express = require('express');
const router = express.Router();

const api = process.env.API_URL

router.get(`${api}/login`, (req, res) => {
    res.json(process.env.SUCCESS_RESPONSE)
})

router.get(`${api}/register`, (req, res) => {
    res.json(process.env.SUCCESS_RESPONSE)
})

router.post(`${api}/register`, (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        isSober: req.body.isSober
    })

    user.save().then(createdUser =>
        res.status(201).json(createdUser)).catch(err => res.status(500).json({
        error: err,
        success: false
    }))
})

module.exports = router
