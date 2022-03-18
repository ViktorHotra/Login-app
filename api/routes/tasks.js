const {Task} = require('../models/task')
const express = require('express');
const router = express.Router()

const api = process.env.API_URL

router.get(`${api}/tasks`, async (req, res) => {
    const tasksList = await Task.find()

    if(!tasksList) {
        res.status(500).json({success: false})
    }
    res.send(tasksList)
 })

router.post(`${api}/tasks`, async (req, res) => {
    let task = new Task({
        task: req.body.newTask
    })

    task = await task.save()

    if(!task) {
        return res.status(500).send('Task cannot be saved')
    }
    res.send(task)
})

router.delete(`${api}/tasks/:id`, async (req, res) => {
    await Task.findByIdAndRemove(req.params.id)
    res.json(process.env.SUCCESS_RESPONSE)
})

module.exports = router
