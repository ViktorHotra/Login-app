const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    task: String
})

exports.Task = mongoose.model('Task', taskSchema)
