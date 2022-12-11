const mongoose = require('mongoose')

const notesModals = mongoose.model('Notes', mongoose.Schema({

    title: String,
    note: String,
    category: [],
    author: String,
    UserID : String

}, {
    versionKey: false,
    timestamps: true
}))


module.exports = { notesModals }