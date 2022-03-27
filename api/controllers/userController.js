const { User } = require('../models/user');
const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.changePassword = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const salt = await bcrypt.genSalt(saltRounds);
    if (!user) {
        res.send(`User don't exist`);
    } else {
        user.password = await bcrypt.hash(req.body.newPassword, salt);
        await user.save();
        res.send('Password has been changed');
    }
};

exports.removeUser = async (req, res) => {
    try {
    await User.findByIdAndRemove(req.user.userId);
    } catch (e) {
        console.log(e)
    }
    res.json(process.env.SUCCESS_RESPONSE);
};
