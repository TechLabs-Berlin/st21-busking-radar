const Event = require('../models/event.js')

module.exports.getEvents = async (req, res) => {
    try {
        //it has to be asynchronous function, because getting events 
        //from the database takes some time
        const events = await Event.find({});
        console.log(events);
        res.send(events);
    } catch (e) {
        console.log('This did not work!', e.message)
    }
}

module.exports.createEvent = async (req, res) => {
    //req.body <-getting the event data from the front end create event form
    const event = req.body
    //newEvent <-creating a new event by passing the values from the event
    //it will create the new event, because it is the object with
    //the same values, as needed for the creation of the event in the 
    //mongoDB schema
    const newEvent = new Event(event)
    try {
        await newEvent.save()
    } catch (e) {
        console.log('This did not work', e.message)
    }
}

