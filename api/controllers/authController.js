const AuthServices = require('../services/authService');

exports.userLogIn = async (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const loggedUser = await AuthServices.loginUser(userData);
        return res.json({ ...loggedUser, status: 200, success: true, message: 'Successfully login' });
    } catch (e) {
        return res.json({ status: 400, success: false, message: 'Invalid email or password' });
    }
};

exports.userRegister = async (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
        isSober: req.body.isSober,
    };
    try {
        const savedUser = await AuthServices.createUser(userData);
        return res.status(201).json({ ...savedUser, success: true, message: 'Successfully created user' });
    } catch (e) {
        return res.status(400).json({ status: 400, success: false, message: 'User creation was unsuccessful' });
    }
};
