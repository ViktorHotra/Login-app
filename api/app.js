const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
require('dotenv/config');

app.use(cors());
app.options('*', cors());

// middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(authJwt());
// app.use(errorHandler);

// Routes
const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');

app.use(`/`, authRoutes);
app.use(`/`, tasksRoutes);
app.use(`/`, usersRoutes);

mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => console.log('Successfully Connected to the Loginapp Database...'))
    .catch((err) => console.log(err));

app.listen(process.env.SERVER_PORT, () =>
    console.log(`Server is running on http://localhost:${process.env.SERVER_PORT}`)
);
