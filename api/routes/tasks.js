const express = require('express');
const router = express.Router()
const {getTasksList, addTask, removeTask} = require("../controllers/taskController");

const api = process.env.API_URL

router.get(`${api}/tasks`, getTasksList)
router.post(`${api}/tasks`, addTask)
router.delete(`${api}/tasks/:id`, removeTask)

module.exports = router
