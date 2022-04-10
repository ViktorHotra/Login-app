const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isSober: {
            type: Boolean,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        date: Date,
    },
    { versionKey: false }
);

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', { virtuals: true });

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
