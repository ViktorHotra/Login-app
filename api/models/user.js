const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    isSober: Boolean
})

exports.User = mongoose.model('User', userSchema)
