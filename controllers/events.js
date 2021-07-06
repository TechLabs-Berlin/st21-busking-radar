const moment = require('moment')
const mongoose = require('mongoose');
// const { findByIdAndRemove } = require('../models/event.js');
const Event = require('../models/event.js');

//fetching events
module.exports.getEvents = async (req, res) => {
    try {
        //it has to be asynchronous function, because getting events 
        //from the database takes some time
        const events = await Event.find({});
        res.send(events);
    } catch (e) {
        console.log('This did not work!', e.message)
    }
}

//creating event
module.exports.createEvent = async (req, res) => {
    //req.body <-getting the event data from the front end create event form
    //<-checking if there is an event exists which with the same time and location
    const event = req.body
    const events = await Event.find({})
    const similarEvent = events.filter(eventToFind => {
        if (eventToFind.geometry.coordinates[0] == event.geometry.coordinates[0]) {
            if (moment(event.startTime).unix() < moment(eventToFind.startTime).unix() && moment(eventToFind.startTime).unix() <= moment(event.endTime)) {
                return eventToFind
            } else if (moment(eventToFind.endTime).unix() > moment(event.startTime).unix() && moment(eventToFind.endTime).unix() <= moment(event.endTime)) {
                return eventToFind
            }
        }
    })[0]
    if (similarEvent && event.confirmation === false) {
        return res.status(400).json({ msg: `Another event is booked at that time between ${moment(similarEvent.startTime).format('h:mm:ss a')} ${moment(similarEvent.endTime).format('h:mm:ss a')} in this location` })
    } else {
        const newEvent = new Event(event)
        newEvent.save()
    }



    // if (checkEvents === true) throw e
    // } catch (e) {
    //     res.json(400).json({ msg: "event at this location and time already exists, please choose other location or time" })
    // }
    //newEvent <-creating a new event by passing the values from the event
    //it will create the new event, because it is the object with
    //the same values, as needed for the creation of the event in the 
    //mongoDB schema
    // const newEvent = new Event(event)
    // try {
    //     newEvent.save()
    // } catch (e) {
    //     console.log('This did not work', e.message)
    // }
    // console.log(newEvent)
}

// if (moment(event.startTime).isSameOrAfter(moment(eventToFind.startTime))
// || moment(event.endTime).isSameOrAfter(moment(eventToFind.startTime))
// || moment(event.endTime).isSameOrBefore(moment(eventToFind.endTime))) {
// return eventToFind
// }

//updating event

module.exports.updateEvent = async (req, res) => {
    //we have to rename id into _id, because this is what mongodb atlas expects
    const { id: _id } = req.params;
    const event = req.body;
    //checking if Id is valid
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.send('No event with that id');
    }
    await Event.findByIdAndUpdate(_id, event, { new: true }) //<- {new: true} checks if we actually received the updated version of event
}

//delete event

module.exports.deleteEvent = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.send('No event with that id');
    }
    await Event.findByIdAndRemove(id)
}

