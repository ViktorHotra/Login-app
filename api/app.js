const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

app.use(cors())
app.options('*', cors())

// middleware
app.use(bodyParser.json())
app.use(morgan('dev'))

// Routes
const registerRoutes = require('./routes/auth')

app.use(`/`, registerRoutes)

mongoose.connect(process.env.CONNECTION_URL).then(() => console.log('Connected to db')).catch(err => console.log(err))

app.listen(process.env.SERVER_PORT, () => console.log(`Server is running on http://localhost:${process.env.SERVER_PORT}`))
