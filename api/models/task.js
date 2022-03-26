const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task: String,
    userId: String
}, {versionKey: false})

exports.Task = mongoose.model('Task', taskSchema)
