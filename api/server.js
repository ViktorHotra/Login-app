const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv/config')
const api = process.env.API_URL
const registerRouter = require('./routes/register')
const port = 3500

// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

app.use(`${api}/register`, registerRouter)

const User = require('./models/user')

const success = { success: true }

app.get(`${api}/`, (req, res) => {
    res.json(success)
})

app.get(`${api}/login`, (req, res) => {
    res.json(success)
})

app.get(`${api}/users`, async (req, res) => {
    const users = await User.find()
    res.send(users)
})

app.post(`${api}/login`, (req, res) => {
    const user = new User({
        email: req.body.email, password: req.body.password
    })
    user.save().then(createdUser => res.status(201).json(createdUser)).catch(err => res.status(500).json({
        error: err, success: false
    }))
})

mongoose.connect(process.env.CONNECTION_URL).then(() => console.log('Connected to db')).catch(err => console.log(err))

app.listen(port, () => console.log('Server is running...'))
