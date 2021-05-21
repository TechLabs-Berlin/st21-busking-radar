import { PromiseProvider } from 'mongoose';
import React, { useState } from 'react';

const EventForm = (props) => {
    const [state, setState] = useState({
        name: '',
        genre: '',
        about: '',
        tags: '',
        time: '',
        location: '',
        active: false,
        error: ''
    })
    const handleChange = (e) => {
        setState({
            ...state,
            //this is the name of the element that we are targeting, depending on which input element
            //
            [e.target.name]: e.target.value
        })
    }
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
            <p>Time</p>
            <p>Date Time Picker should be here</p>
            <p>Location</p>
            <p>Should be either click on the map or choose from select options</p>
        </form>
    )
}

export default EventForm;