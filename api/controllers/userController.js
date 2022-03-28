const UserServices = require('../services/userService');
const { Task } = require('../models/task');

exports.changePassword = async (req, res) => {
    const user = {
        id: req.user.userId,
        newPassword: req.body.newPassword,
    };
    try {
        await UserServices.passwordChange(user);
        res.status(201).json({ success: true, message: 'Password changed successfully' });
    } catch (e) {
        res.json({ status: 400, success: false, message: 'Error during password change' });
    }
};

exports.removeUser = async (req, res) => {
    const id = req.user.userId;
    try {
        await UserServices.deleteUser(id);
        await Task.deleteMany({ userId: id });
        res.status(201).json({ success: true, message: 'User removed successfully' });
    } catch (e) {
        res.json({ status: 400, success: false, message: 'Error during user remove' });
    }
};
