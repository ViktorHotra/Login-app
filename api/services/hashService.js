const bcrypt = require('bcrypt');

exports.toHash = async (data) => {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    return bcrypt.hash(data, salt);
};
