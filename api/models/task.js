const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task: String
}, {versionKey: false})

exports.Task = mongoose.model('Task', taskSchema)
