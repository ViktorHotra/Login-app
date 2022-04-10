const UserServices = require('../services/userService');

exports.changePassword = async ({ user: { id }, body: { newPassword } }, res) => {
    const data = {
        id,
        newPassword,
    };
    try {
        await UserServices.passwordChange(data);
        res.status(201).json({ success: true, message: 'Password changed successfully' });
    } catch (e) {
        res.json({ status: 400, success: false, message: 'Error during password change' });
    }
};

exports.removeUser = async ({ user: { id } }, res) => {
    try {
        await UserServices.deleteUser(id);
        res.status(201).json({ success: true, message: 'User removed successfully' });
    } catch (e) {
        res.json({ status: 400, success: false, message: 'Error during user remove' });
    }
};
