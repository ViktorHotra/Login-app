const express = require('express');
const router = express.Router();
const {changePassword} = require("../controlers/userController");

const api = process.env.API_URL;

router.post(`${api}/change`, changePassword)

module.exports = router;
