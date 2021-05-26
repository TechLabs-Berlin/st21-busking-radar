const express = require('express');
const router = express.Router();

//importing controllers: controllers are basically the callback functions
//which would be usually in the routes and http requests, but they are stored
//in a separate file. This is needed in order to make the project structure
//more clear and undesrtandable avoiding the creation of very long functions
//Requiring or importing controllers: this is an 'old' way of doing it. Today it is possible to do all exports and imports with ES6 syntax.
//We are doing it this 'old' way for learning purposes. 
const events = require('../controllers/events.js')

router.get('/', events.getEvents)

router.post('/', events.createEvent)

router.patch('/update/:id', events.updateEvent)

router.delete('/:id', events.deleteEvent)

module.exports = router;