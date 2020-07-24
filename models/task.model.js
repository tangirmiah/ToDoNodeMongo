const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task;