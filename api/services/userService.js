const bcrypt = require('bcrypt');
const { User } = require('../models/user');

const saltRounds = 10;

exports.deleteUser = async (id) => {
    try {
        await User.findByIdAndRemove(id);
    } catch (e) {
        throw new Error('There is no such user');
    }
};

exports.passwordChange = async (user) => {
    try {
        const userData = await User.findOne({ _id: user.id });
        const salt = await bcrypt.genSalt(saltRounds);
        userData.password = await bcrypt.hash(user.newPassword, salt);
        await userData.save();
    } catch (e) {
        throw new Error('Error in password change');
    }
};
