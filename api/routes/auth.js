const {User} = require('../models/user')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const api = process.env.API_URL
const saltRounds = 10

router.get(`${api}/login`, (req, res) => {
    res.json(process.env.SUCCESS_RESPONSE)
})

router.post(`${api}/login`, async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
const secret = process.env.secret
        if (!user) {
            return res.send('User not found')
        }
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token = await jwt.sign(
                {
                    userId: user.id,
                },
                secret, {
                    expiresIn: '100d'
                }
            )
            res.status(200).send({user: user.email, token: token})
        } else {
            res.status(400).send('password is incorrect')
        }
    } catch (e) {
        res.send(process.env.ERR_RESPONSE)
    }

})

router.get(`${api}/register`, (req, res) => {
    res.json(process.env.SUCCESS_RESPONSE)
})

router.post(`${api}/register`, async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)

        let user = new User({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
            isSober: req.body.isSober
        })
        await user.save()
        res.json(process.env.SUCCESS_RESPONSE)
    } catch (e) {
        res.json(process.env.ERR_RESPONSE)
    }
})

router.get(`${api}/change`, (req, res) => {
    User.findOne({ email: req.body.body})
})

module.exports = router
