const express = require('express');

const router = express.Router();
const { getTasksList, addTask, removeTask } = require('../controllers/taskController');
const { jwt } = require('../middlewares/passport');

const api = process.env.API_URL;

router.get(`${api}/tasks`, jwt, getTasksList);
router.post(`${api}/tasks`, jwt, addTask);
router.delete(`${api}/tasks/:id`, jwt, removeTask);

module.exports = router;
