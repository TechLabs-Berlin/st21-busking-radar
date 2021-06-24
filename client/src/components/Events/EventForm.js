import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import moment from 'moment';
import { clearErrors } from '../../actions/error';

const EventForm = (props) => {
    const [eventData, setEventData] = useState({
        name: props.event ? props.event.name : '',
        creator: props.event ? props.event.creator : props.auth.user.name, // I will have to change that once we have the user authetication and users
        genre: props.event ? props.event.genre : '',
        about: props.event ? props.event.about : '',
        tags: props.event ? props.event.tags : '',
        startTime: props.event ? props.event.startTime : '',
        endTime: props.event ? props.event.endTime : '',
        locationName: props.event ? props.event.locationName : props.newLocation[0] || '',
        geometry: props.event ? props.event.geometry : { type: 'Point', coordinates: [props.newLocation[1], props.newLocation[2]] },
        active: props.event ? props.event.active : false,
        userId: props.event ? props.event.userId : props.auth.user._id,
        confirmation: false,
        error: ''
    })
    const [dataSubmitted, setDataSubmitted] = useState(false)
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error)
    const handleChange = (e) => {
        setEventData({
            ...eventData,
            //this is the name of the element that we are targeting, depending on which input element
            [e.target.name]: e.target.value,
        })
    }

    //date-time picker
    const [startTime, setStartTime] = useState(props.event ? moment(props.event.startTime).toDate() : new Date)
    const [endTime, setEndTime] = useState(props.event ? moment(props.event.endTime).toDate() : new Date)
    const handleStartTimeChange = (date) => {
        dispatch(clearErrors())
        setEventData({ ...eventData, error: '' })
        setStartTime(date)
        setEndTime(date)
    }
    eventData.startTime = startTime

    const handleEndTimeChange = (date) => {
        if (moment(date).unix() > moment(startTime).unix()) {
            setEndTime(date)
        } else {
            setEventData({
                error: 'Please provide correct time'
            })
        }
    }

    eventData.endTime = endTime

    useEffect(() => {
        if (error.id === 'SIMILAR_EVENT_EXISTS') {
            setEventData({ ...eventData, error: error.msg.msg, confirmation: true })
        }
    }, [error])
    useEffect(() => {
        //return function is similar to the component will unmount in the class components
        return () => {
            dispatch(clearErrors())
        }
    }, [])
    useEffect(() => {
        if (!error.msg.msg) {
            props.history.push('/events')
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!eventData.name) {
            setEventData({ ...eventData, error: 'Please provide event name' })
        } else if (!eventData.startTime || !eventData.endTime) {
            setEventData({ ...eventData, error: 'Please provide time' })
        } else if (!eventData.geometry || !eventData.locationName) {
            setEventData({ ...eventData, error: 'Please provide location' })
        } else {
            props.handleSubmit(eventData)
            setDataSubmitted(true)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <p>Location:</p>
            <input type="text" placeholder="Please type in the location name" name="locationName" autoFocus value={eventData.locationName || ''} onChange={handleChange} />
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
            {eventData.error && <p>{eventData.error}</p>}
            <Button type='submit' className='btn-lg' size='small'>
                <PublishIcon />
                {!eventData.error ? 'Publish Event' : 'Create Event Anyway'}
            </Button>
        </form>
    )
}

export default EventForm;


// <div>

// <select name='location' value={eventData.location || ''} onChange={handleChange}>
//     <option value="mauer-park">Mauer Park</option>
//     <option value="warschauer-str-ubahn">Warschauer Str. U-Bahn</option>
//     <option value="hackescher-markt">Hackescher Markt</option>
//     <option value="tempelhofer-feld">Tempelhofer Feld</option>
//     <option value="admiral-brucke">Admiral Brücke</option>
// </select>
// </div>