import React, { useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';

const EventForm = (props) => {
    const [eventData, setEventData] = useState({
        name: props.event ? props.event.name : '',
        creator: props.event ? props.event.creator : 'anomymous', // I will have to change that once we have the user authetication and users
        genre: props.event ? props.event.genre : '',
        about: props.event ? props.event.about : '',
        tags: props.event ? props.event.tags : '',
        startTime: props.event ? props.event.startTime : 0,
        endTime: props.event ? props.event.endTime : 0,
        location: props.event ? props.event.location : '',
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
    //I had to set the date and start and end time separately and use a separate handler, because in the MUI date picker, we are 
    //missing the event property, which is null. It means we cannot access neither its name nor value through the normal
    //handlers like other input elements. These kind of things are done behind the scene by material ui component.
    //select date
    const [selectedDate, setSelectDate] = useState(Date)
    const [startTime, setStartTime] = useState(Date)
    const [endTime, setEndTime] = useState(Date)
    const handleDateChange = (date) => {
        setSelectDate(date)
    }
    const handleStartTimeChange = (startTime) => {
        setStartTime(startTime)
    }
    const handleEndTimeChange = (endTime) => {
        //conditional to make sure that the provided end time is later thn the start time
        if (moment(endTime).unix() > moment(startTime).unix()) {
            setEndTime(endTime)
        }
    }
    // console.log(new Date(converted * 1000))
    //it has to be outside of the handleDateChange function, because otherwise, it state.date updates with the delay
    //because it is within the context of handDateChange function.
    eventData.startTime = eventData.startTime + moment(selectedDate).unix()
    eventData.endTime = eventData.endTime + moment(selectedDate).unix()
    eventData.startTime = eventData.startTime + moment(startTime).unix()
    eventData.endTime = eventData.endTime + moment(endTime).unix()
    // eventData.startTime = new Date(eventData.startTime * 1000)
    // eventData.endTime = new Date(eventData.endTime * 1000)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!eventData.name) {
            setEventData({ error: 'Please provide user name' })
        } else if (!eventData.time) {
            setEventData({ error: 'Please provide time' })
        } else if (!eventData.location) {
            setEventData({ error: 'Please provide location' })
        } else {
            props.handleSubmit({ ...eventData, startTime: new Date(eventData.startTime * 1000), endTime: new Date(eventData.endTime * 1000) })
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
            <p>Date and Time</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div id='date-picker' className='date-picker'>
                    <KeyboardDatePicker
                        disableToolbar
                        variant='inline'
                        format='MM/dd/yy'
                        margin='normal'
                        id='date-picker'
                        label='Date'
                        value={endTime}
                        name="date"
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date'
                        }}
                    />
                </div>
                <div id="start-time-picker" className='time-picker'>
                    <KeyboardTimePicker
                        margin='normal'
                        id='time-picker'
                        label='Start Time'
                        value={startTime}
                        name="time"
                        onChange={handleStartTimeChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date'
                        }}
                    />
                </div>
                <div id="start-time-picker" className='time-picker'>
                    <KeyboardTimePicker
                        margin='normal'
                        id='time-picker'
                        label='End Time'
                        value={endTime}
                        name="time"
                        onChange={handleEndTimeChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date'
                        }}
                    />
                </div>
            </MuiPickersUtilsProvider>
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