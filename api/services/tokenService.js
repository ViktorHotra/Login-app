const jwt = require('jsonwebtoken');

exports.generate = async (user, expiresIn = '1d') =>
    jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn,
    });
