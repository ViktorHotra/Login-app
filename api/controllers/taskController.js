const TaskService = require('../services/taskService');

exports.getTasksList = async ({ user: { id } }, res) => {
    try {
        const tasksList = await TaskService.getUserTaskList(id);
        res.json({ tasksList, success: true, message: 'Task list created successfully' });
    } catch (e) {
        res.json({ success: false, message: 'Error while creating task list' });
    }
};

exports.addTask = async ({ body: { newTask }, user: { _id } }, res) => {
    const data = {
        task: newTask,
        userId: _id,
    };
    try {
        await TaskService.createTask(data);
        res.json({ success: true, message: 'Task created successfully' });
    } catch (e) {
        res.json({ success: false, message: 'Task cannot be created' });
    }
};

exports.removeTask = async ({ params: { id } }, res) => {
    try {
        await TaskService.deleteTask(id);
        res.json({ success: true, message: 'Task deleted successfully' });
    } catch (e) {
        res.json({ success: false, message: `Task wasn't deleted` });
    }
};
