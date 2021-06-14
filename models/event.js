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
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    locationName: {
        type: String,
        lowercase: true,
        required: true,
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    active: {
        type: Boolean,
        default: false
    }
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;