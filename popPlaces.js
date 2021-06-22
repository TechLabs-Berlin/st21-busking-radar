const mongoose = require('mongoose');
const express = require('express');

//this is only an approximate schema for event
const popPlaceSchema = new mongoose.Schema({
    locationNumber:{
        type: Number,
        required: false
    },
    placeName: {
        type: String,
        required: true
    },
    district: {
        type: String,
      
    },
    locationCoordinates: {
        type: [Number],
        required: true
    },
    googleCode:{
        type: String,
    }
})

const popPlace = mongoose.model('popPlace', popPlaceSchema);



 module.exports = popPlace;