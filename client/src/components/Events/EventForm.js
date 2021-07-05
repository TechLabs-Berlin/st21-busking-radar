import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal } from '@material-ui/core';
import moment from 'moment';
import { clearErrors } from '../../actions/error';
import { startCreateEvent } from '../../actions/events';

//material ui modal styles
function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '90%',
        height: '50vh',
        fontSize: '1.2em',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '20px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
}));

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
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error)


    //handling errors with useEffect
    //This one sets the error message to the local state
    useEffect(() => {
        if (error.id === 'SIMILAR_EVENT_EXISTS') {
            setEventData({ ...eventData, error: error.msg.msg })
        }
    }, [error])
    useEffect(() => {
        //return function is similar to the component will unmount in the class components
        return () => {
            dispatch(clearErrors())
        }
    }, [])

    //handlers
    const handleModal = () => {
        if (!eventData.error) {
            props.history.push('/events')
            setOpenModal(!openModal)
        } else if (eventData.error) {
            dispatch(startCreateEvent({ ...eventData, confirmation: true }))
            props.history.push('/events')
            setOpenModal(!openModal)
        }
    }

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

    const handleSubmit = (e) => {
        if (!eventData.name) {
            setEventData({ ...eventData, error: 'Please provide event name' })
        } else if (!eventData.startTime || !eventData.endTime) {
            setEventData({ ...eventData, error: 'Please provide time' })
        } else if (!eventData.geometry || !eventData.locationName) {
            setEventData({ ...eventData, error: 'Please provide location' })
        } else {
            dispatch(startCreateEvent(eventData))
            setOpenModal(!openModal)
        }
        e.preventDefault()
    }
    return (
        <div className='create-event-form-container'>
            {eventData.error && <p className='error'>{eventData.error}</p>}
            <button className='btn-sm btn-back' onClick={() => {
                props.history.goBack()
            }}><i class="fas fa-2x fa-chevron-left icon-color"></i>
            </button>
            <form className='event-form' onSubmit={handleSubmit}>
                <label>Location:</label>
                <input className='input' type="text" placeholder="Please type in the location name" name="locationName" autoFocus value={eventData.locationName || ''} onChange={handleChange} />
                <input className='input' type="text" placeholder="event name" name="name" autoFocus value={eventData.name || ''} onChange={handleChange} />
                <input className='input' type="text" placeholder="genre" name="genre" autoFocus value={eventData.genre || ''} onChange={handleChange} />
                <textarea className='input textarea' type="text" placeholder="description (max 80 characters)" cols='4' maxLength='80' rows='4' name="about" autoFocus value={eventData.about || ''} onChange={handleChange} />
                <label>Event begins:</label>
                <DatePicker
                    selected={startTime}
                    name='startTime'
                    onChange={handleStartTimeChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="MMMM d, yyyy HH:mm aa"
                    minDate={new Date()}
                    popperPlacement='auto-left'
                />
                <label>Event ends:</label>
                <DatePicker
                    selected={endTime}
                    name='startTime'
                    onChange={handleEndTimeChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="MMMM d, yyyy HH:mm aa"
                    minDate={new Date()}
                    popperPlacement='auto-left'
                />
                <button type='submit' className='btn-lg' size='small' >
                    Submit
                </button>
            </form>
            <Modal
                open={openModal}
                onClose={() => {
                    setOpenModal(!openModal)
                }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={`${classes.paper} modal-container`} >
                    {eventData.error && <h2 className='hd-modal'>Ooops!</h2>}
                    <p id="simple-modal-title" className='text-sub'>{eventData.error ? eventData.error : 'Event was created'}</p>
                    <button className='btn-lg' onClick={handleModal}>{eventData.error ? 'Submit anyway' : 'submit'}</button>
                    {eventData.error && <button className='btn-lg' onClick={() => { setOpenModal(!openModal) }}>Go Back</button>}
                </div>
            </Modal>
        </div>
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