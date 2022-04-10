const AuthService = require('../services/authService');
const TokenService = require('../services/tokenService');

exports.userLogIn = async ({ body: { email, password } }, res) => {
    const data = {
        email,
        password,
    };
    try {
        const user = await AuthService.loginUser(data);
        return res.json({ ...user, status: 200, success: true, message: 'Successfully login' });
    } catch (e) {
        return res.json({ status: 400, success: false, message: 'Invalid email or password' });
    }
};

exports.userRegister = async ({ body: { email, password, isSober } }, res) => {
    const data = {
        email,
        password,
        isSober,
    };
    try {
        const user = await AuthService.createUser(data);
        if (user) {
            return res.status(201).json({ ...user, success: true, message: 'Successfully created user' });
        }
        return res.json({ success: false, message: 'User already exists' });
    } catch (e) {
        return res.status(400).json({ status: 400, success: false, message: 'User creation was unsuccessful' });
    }
};

exports.userReload = async ({ user }, res) => {
    res.json({
        success: true,
        user: user.email,
        token: await TokenService.generate(user),
    });
};
