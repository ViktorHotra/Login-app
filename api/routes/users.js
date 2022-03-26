const express = require('express');
const router = express.Router();
const {changePassword} = require("../controllers/userController");

const api = process.env.API_URL;

router.post(`${api}/change`, changePassword)

module.exports = router;
