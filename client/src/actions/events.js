import axios from 'axios';
import { tokenConfig } from './auth';
import { returnErrors } from './error';

//Get posts action. It sends http requests to server, where it hits route specified in the requests, which in turn
//gets events from the database and sends it back to us. 
const getAllEvents = (payload = []) => {
    return {
        type: 'GET_ALL_EVENTS',
        payload: payload
    }
}

export const startGetAllEvents = () => async (dispatch) => {
    try {
        //we do not need to specify the root more hear than just '/events' because in the backend route it is also 
        //get() which getting the data from the database and sending it back (Am I right?! I should check it later again!).
        const { data } = await axios.get('/events')
        dispatch(getAllEvents(data))
    } catch (e) {
        dispatch(returnErrors(e.message))
    }
}

//create event

const createEvent = (eventData) => {
    return {
        type: 'CREATE_EVENT',
        eventData
    }
}

export const startCreateEvent = (eventData) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post('/events', eventData, tokenConfig(getState));
        //here we are descructuring and dispatching to the local state the same data that was send to the server 
        dispatch(createEvent(data))
    } catch (e) {
        dispatch(returnErrors(e.message))
    }
}



//update event axios.patch(`/events/update/${id}`, updates)

const updateEvent = (id, updates) => {
    return {
        type: 'UPDATE_EVENT',
        updates,
        id,
    }
}

export const startUpdateEvent = (id, updates) => async (dispatch) => {
    //tokenConfig(getState) you should add the protected update later,
    //after you make a separate unprotected route, which would auto fetch and update the status of the event
    try {
        const { data } = await axios.patch(`/events/update/${id}`, updates);

        dispatch(updateEvent(data))
    } catch (e) {
        dispatch(returnErrors(e.message))
    }
}

//delete event 

const deleteEvent = (id) => {
    return {
        type: 'DELETE_EVENT',
        id
    }
}

export const startDeleteEvent = (id) => async (dispatch, getState) => {
    try {
        //for some reason, if I await for axios.delete the action does not dispatch to store
        await axios.delete(`/events/${id}`, tokenConfig(getState))
        dispatch(deleteEvent(id))
    } catch (e) {
        dispatch(returnErrors(e.message))
    }
}