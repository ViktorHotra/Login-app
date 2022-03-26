const {Task} = require("../models/task");

exports.getTasksList = async (req, res) => {
    const tasksList = await Task.find({userId: req.user.userId})

    if (!tasksList) {
        res.status(500).json({success: false})
    }
    res.send(tasksList)
};

exports.addTask = async (req, res) => {
    let task = new Task({
        task: req.body.newTask,
        userId: req.user.userId
    })
    task = await task.save()
    if (!task) {
        return res.status(500).send('Task cannot be saved')
    }
    res.send(task)
};

exports.removeTask = async (req, res) => {
    await Task.findByIdAndRemove(req.params.id)
    res.json(process.env.SUCCESS_RESPONSE)
};
