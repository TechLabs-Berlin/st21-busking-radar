import React, { useState } from 'react';
import 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const EventForm = (props) => {
    const [eventData, setEventData] = useState({
        name: props.event ? props.event.name : '',
        creator: props.event ? props.event.creator : 'anomymous', // I will have to change that once we have the user authetication and users
        genre: props.event ? props.event.genre : '',
        about: props.event ? props.event.about : '',
        tags: props.event ? props.event.tags : '',
        startTime: props.event ? props.event.startTime : '',
        endTime: props.event ? props.event.endTime : '',
        locationName: props.event ? props.event.locationName : '',
        locationCoordinates: props.event ? props.event.locationCoordinates : '',
        active: props.event ? props.event.active : false,
        error: ''
    })
    const handleChange = (e) => {
        setEventData({
            ...eventData,
            //this is the name of the element that we are targeting, depending on which input element
            [e.target.name]: e.target.value,
        })
    }

    //date-time picker
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())

    const handleStartTimeChange = (date) => {
        setStartTime(date)
    }
    eventData.startTime = startTime

    const handleEndTimeChange = (date) => {
        if (moment(endTime).unix() > moment(startTime).unix()) {
            setEndTime(date)
        } else {
            setEventData({ error: 'Please choose correct end time' })
        }
        setEventData({ error: '' })
    }

    eventData.endTime = endTime

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!eventData.name) {
            setEventData({ error: 'Please provide user name' })
        } else if (!eventData.startTime || !eventData.endTime) {
            setEventData({ error: 'Please provide time' })
        } else if (!eventData.location) {
            setEventData({ error: 'Please provide location' })
        } else {
            props.handleSubmit(eventData)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <p>Event name</p>
            <input type="text" placeholder="event name" name="name" autoFocus value={eventData.name || ''} onChange={handleChange} />
            <p>Genre</p>
            <input type="text" placeholder="genre" name="genre" autoFocus value={eventData.genre || ''} onChange={handleChange} />
            <p>About</p>
            <input type="text" placeholder="about" name="about" autoFocus value={eventData.about || ''} onChange={handleChange} />
            <p>Tags</p>
            <input type="text" placeholder="tags" name="tags" autoFocus value={eventData.tags || ''} onChange={handleChange} />
            <p>Event begins:</p>
            <DatePicker
                selected={startTime}
                name='startTime'
                onChange={handleStartTimeChange}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MMMM d, yyyy HH:mm aa"
                minDate={new Date()}
            />
            <p>Event ends:</p>
            <DatePicker
                selected={endTime}
                name='startTime'
                onChange={handleEndTimeChange}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MMMM d, yyyy HH:mm aa"
                minDate={new Date()}
            />
            <p>Choose location:</p>
            <div>
                <select name='location' value={eventData.location || ''} onChange={handleChange}>
                    <option value="mauer-park">Mauer Park</option>
                    <option value="warschauer-str-ubahn">Warschauer Str. U-Bahn</option>
                    <option value="hackescher-markt">Hackescher Markt</option>
                    <option value="tempelhofer-feld">Tempelhofer Feld</option>
                    <option value="admiral-brucke">Admiral Brücke</option>
                </select>
            </div>
            {eventData.error && <p>{eventData.error}</p>}
            <button className='btn btn-create'>Submit</button>
        </form>
    )
}

export default EventForm;
