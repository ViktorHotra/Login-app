const { Task } = require('../models/task');

exports.getUserTaskList = async (userId) => {
    try {
        return await Task.find({ userId });
    } catch (e) {
        throw Error('Error during creating tasks list');
    }
};

exports.createTask = async (taskData) => {
    try {
        const newTask = new Task({
            task: taskData.task,
            userId: taskData.userId,
        });
        await newTask.save();
    } catch (e) {
        throw new Error('Error while creating task');
    }
};

exports.deleteTask = async (taskId) => {
    try {
        await Task.findByIdAndRemove(taskId);
    } catch (e) {
        throw new Error('Error while deleting task');
    }
};
