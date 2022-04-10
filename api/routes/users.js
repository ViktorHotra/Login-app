const express = require('express');

const router = express.Router();
const { changePassword, removeUser } = require('../controllers/userController');
const { jwt } = require('../middlewares/passport');

const api = process.env.API_URL;

router.post(`${api}/change`, jwt, changePassword);
router.delete(`${api}/remove`, jwt, removeUser);

module.exports = router;
