const express = require('express');

const router = express.Router();
const { userLogIn, userRegister } = require('../controllers/authController');

const api = process.env.API_URL;

router.post(`${api}/login`, userLogIn);
router.post(`${api}/register`, userRegister);

module.exports = router;
