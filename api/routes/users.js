const express = require('express');

const router = express.Router();
const { changePassword, removeUser } = require('../controllers/userController');

const api = process.env.API_URL;

router.post(`${api}/change`, changePassword);
router.delete(`${api}/remove`, removeUser);

module.exports = router;
