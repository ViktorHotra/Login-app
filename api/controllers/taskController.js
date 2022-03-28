const TaskService = require('../services/taskService');

exports.getTasksList = async (req, res) => {
    const { userId } = req.user;
    try {
        const tasksList = await TaskService.getUserTaskList(userId);
        res.json({ tasksList, success: true, message: 'Task list created successfully' });
    } catch (e) {
        res.json({ success: false, message: 'Error while creating task list' });
    }
};

exports.addTask = async (req, res) => {
    const taskData = {
        task: req.body.newTask,
        userId: req.user.userId,
    };
    try {
        await TaskService.createTask(taskData);
        res.json({ success: true, message: 'Task created successfully' });
    } catch (e) {
        res.json({ success: false, message: 'Task cannot be created' });
    }
};

exports.removeTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        await TaskService.deleteTask(taskId);
        res.json({ success: true, message: 'Task deleted successfully' });
    } catch (e) {
        res.json({ success: false, message: `Task wasn't deleted` });
    }
};
