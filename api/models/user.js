const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    confirm: String,
    isSober: Boolean
})

exports.User = mongoose.model('User', userSchema)
