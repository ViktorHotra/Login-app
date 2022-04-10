const { User } = require('../models/user');
const { Task } = require('../models/task');
const HashService = require('./hashService');

const getById = async (id) => User.findOne({ _id: id });

exports.deleteUser = async (id) => {
    await User.findByIdAndRemove(id);
    await Task.deleteMany({ userId: id });
};

exports.passwordChange = async ({ id, newPassword }) => {
    const user = await getById(id);
    user.password = await HashService.toHash(newPassword);
    await user.save();
};

exports.getById = getById;
exports.getByEmail = async (email) => User.findOne({ email });
