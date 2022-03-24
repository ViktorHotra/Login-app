const {User} = require('../models/user')
const express = require('express');
const router = express.Router();
const {userLogIn, userRegister} = require("../controlers/authController");

const api = process.env.API_URL

router.post(`${api}/login`, userLogIn)
router.post(`${api}/register`, userRegister)

router.get(`${api}/change`, (req, res) => {
    User.findOne({email: req.body.body})
})

module.exports = router
