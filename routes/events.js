const express = require('express');
const eventsRouter = express.Router();
const auth = require('../middleware/auth.js'); //<-- this middleware is needed in order to protect private routes
// so if someone hits the create, delete or update event accidentaly, 
//he won't be able to do that unless he is authenticated and has a token

//importing controllers: controllers are basically the callback functions
//which would be usually in the routes and http requests, but they are stored
//in a separate file. This is needed in order to make the project structure
//more clear and undesrtandable avoiding the creation of very long functions
//Requiring or importing controllers: this is an 'old' way of doing it. Today it is possible to do all exports and imports with ES6 syntax.
//We are doing it this 'old' way for learning purposes. 
const events = require('../controllers/events.js')

eventsRouter.get('/events', events.getEvents)

eventsRouter.post('/events', auth, events.createEvent)

eventsRouter.patch('/events/update/:id', events.updateEvent)

eventsRouter.delete('/events/:id', auth, events.deleteEvent)

module.exports = eventsRouter;