const mongoose = require('mongoose');

//this is only an approximate schema for event
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    about: {
        type: String
    },
    tags: {
        type: [String]
    },
    time: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    location: {
        type: String,
        lowercase: true,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;