const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    key: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    counts: {
        type: [Number]
    },
    value: {
        type: String
    }
})

const Record = mongoose.model('Record', taskSchema)

module.exports = Record