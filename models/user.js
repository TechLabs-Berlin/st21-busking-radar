const mongoose = require('mongoose');

//this is only an approximate schema for event
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: new Date()
    },
    events: {
        type: [String],
    },
    genre: {
        type: String
    },
    about: {
        type: String
    },
    socialLinks: {
        type: [String]
    },
    selectedFile: {
        type: String
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;