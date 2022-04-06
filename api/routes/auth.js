const express = require('express');

const router = express.Router();
const { userLogIn, userRegister, userReload } = require('../controllers/authController');

const api = process.env.API_URL;

router.post(`${api}/login`, userLogIn);
router.post(`${api}/register`, userRegister);
router.get(`${api}/reload`, userReload);

module.exports = router;
