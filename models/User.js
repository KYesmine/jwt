const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlenght: 5
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User