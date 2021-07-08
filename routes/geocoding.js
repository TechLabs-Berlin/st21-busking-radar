const express = require('express');
const geocodingRouter = express.Router();

const locations = require('../controllers/geocoding.js')

geocodingRouter.post('/geocoding', locations.chooseNewLocation)

module.exports = geocodingRouter