const express = require('express');
const router = express.Router();

const locations = require('../controllers/geocoding.js')

router.post('/', locations.chooseNewLocation)

module.exports = router