const mongoose = require('mongoose')

const UserSchema = mongoose.model('User', mongoose.Schema({

    name: String,
    age: Number,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

}, {
    versionKey: false,
    timestamps: true
}))

module.exports = { UserSchema }