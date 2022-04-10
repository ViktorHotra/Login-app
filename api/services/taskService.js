const { Task } = require('../models/task');

exports.getUserTaskList = async (userId) => {
    try {
        return await Task.find({ userId });
    } catch (e) {
        throw Error('Error during creating tasks list');
    }
};

exports.createTask = async ({ task, userId }) => {
    const newTask = new Task({
        task,
        userId,
    });
    await newTask.save();
};

exports.deleteTask = async (id) => {
    await Task.findByIdAndRemove(id);
};
