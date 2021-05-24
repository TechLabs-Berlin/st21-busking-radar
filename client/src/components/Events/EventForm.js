// import { PromiseProvider } from 'mongoose';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import React, { useState, useEffect } from 'react';

const EventForm = (props) => {
    const [state, setState] = useState({
        name: '',
        genre: '',
        about: '',
        tags: '',
        date: '',
        location: '',
        active: false,
        error: ''
    })
    //I have to set the date separately and use a separate handler, because we in the MUI date picker, we are 
    //missing the event property, which is null. It means we cannot access neither its name nor value through the normal
    //handlers like other input elements. 

    const handleChange = (e) => {
        setState({
            ...state,
            //this is the name of the element that we are targeting, depending on which input element
            //
            [e.target.name]: e.target.value,
        })
    }
    const [selectedDate, setSelectDate] = useState(new Date)
    const handleDateChange = (e) => {
        setSelectDate(e)
    }
    //it has to be outside of the handleDateChange function, because otherwise, it state.date updates with the delay(why? think about it)
    state.date = selectedDate
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!state.name) {
            setState({ error: 'Please provide user name' })
        } else if (!state.time) {
            setState({ error: 'Please provide time' })
        } else if (!state.location) {
            setState({ error: 'Please provide location' })
        } else {
            props.handleSubmit(state)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <p>Event name</p>
            <input type="text" placeholder="event name" name="name" autoFocus value={state.name || ''} onChange={handleChange} />
            <p>Genre</p>
            <input type="text" placeholder="genre" name="genre" autoFocus value={state.genre || ''} onChange={handleChange} />
            <p>About</p>
            <input type="text" placeholder="about" name="about" autoFocus value={state.about || ''} onChange={handleChange} />
            <p>Tags</p>
            <input type="text" placeholder="tags" name="tags" autoFocus value={state.tags || ''} onChange={handleChange} />
            <p>Date and Time</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify='space-around'>
                    <KeyboardDatePicker
                        disableToolbar
                        variant='inline'
                        format='MM/dd/yy'
                        margin='normal'
                        id='date-picker'
                        label='Date picker'
                        value={selectedDate}
                        name="date"
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date'
                        }}
                    />
                    <KeyboardTimePicker
                        margin='normal'
                        id='time-picker'
                        label='Time picker'
                        value={selectedDate}
                        name="time"
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date'
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <p>Date Time Picker should be here</p>
            <p>Location</p>
            <p>Should be either click on the map or choose from select options</p>
        </form>
    )
}

export default EventForm;