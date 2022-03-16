const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: String,
    password: String,
})

exports.User = mongoose.model('User', userSchema)
