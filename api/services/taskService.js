const { Task } = require('../models/task');

exports.getUserTaskList = async (userId) => {
    try {
        return await Task.find({ userId });
    } catch (e) {
        throw Error('Error during creating tasks list');
    }
};

exports.createTask = async ({ task, userId }) => {
    try {
        const newTask = new Task({
            task,
            userId,
        });
        await newTask.save();
    } catch (e) {
        throw new Error('Error while creating task');
    }
};

exports.deleteTask = async (id) => {
    try {
        await Task.findByIdAndRemove(id);
    } catch (e) {
        throw new Error('Error while deleting task');
    }
};
