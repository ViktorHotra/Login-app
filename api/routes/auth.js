const express = require('express');
const { userLogIn, userRegister, userReload } = require('../controllers/authController');
const { jwt } = require('../middlewares/passport');

const router = express.Router();
const api = process.env.API_URL;

router.post(`${api}/login`, userLogIn);
router.post(`${api}/register`, userRegister);
router.get(`${api}/reload`, jwt, userReload);

module.exports = router;
