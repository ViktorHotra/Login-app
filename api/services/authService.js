const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const { secret } = process.env;

exports.createUser = async (user) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const newUser = new User({
        email: user.email,
        password: await bcrypt.hash(user.password, salt),
        isSober: user.isSober,
        date: new Date(),
    });
    try {
        const savedUser = await newUser.save();
        const token = await jwt.sign({ userId: savedUser.id }, secret, {
            expiresIn: '1d',
        });
        return { user: user.email, token };
    } catch (e) {
        throw Error('Error while creating user');
    }
};

exports.loginUser = async (user) => {
    try {
        const userData = await User.findOne({ email: user.email });

        const passwordIsValid = await bcrypt.compare(user.password, userData.password);
        if (!passwordIsValid || !userData) {
            throw Error('Invalid username or password');
        }
        const token = await jwt.sign({ userId: userData.id }, secret, {
            expiresIn: '1d',
        });
        return { user: user.email, token };
    } catch (e) {
        throw Error('Error while login user');
    }
};

exports.reloadUser = async (id) => {
    try {
        const userData = await User.findOne({ _id: id });
        if (!userData) {
            throw Error('User not found');
        }
        const token = await jwt.sign({ userId: id }, secret, { expiresIn: '1d' });
        return { user: userData.email, token };
    } catch (e) {
        throw Error('Error while relogin user');
    }
};
