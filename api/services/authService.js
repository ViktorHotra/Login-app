const { User } = require('../models/user');
const { UserService, HashService, TokenService } = require('.');

exports.createUser = async ({ email, password, isSober }) => {
    if (await UserService.getByEmail(email)) {
        return null;
    }
    const data = new User({
        email,
        password: await HashService.toHash(password),
        isSober,
        date: new Date(),
    });
    const user = await data.save();
    const token = await TokenService.generate(user);
    return { user: email, token };
};

exports.loginUser = async ({ email, password }) => {
    try {
        const user = await UserService.getByEmail(email);
        const isValid = await user.validatePassword(password);
        if (!isValid || !user) {
            throw Error('Invalid username or password');
            return;
        }
        const token = await TokenService.generate(user);
        return { user: email, token };
    } catch (e) {
        throw Error('Error while login user');
    }
};
