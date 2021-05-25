import axios from "axios"


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
        console.log('this did not work', e.message)
    }
}

//create event

const createEvent = (eventData) => {
    return {
        type: 'CREATE_EVENT',
        eventData
    }
}

export const startCreateEvent = (eventData) => async (dispatch) => {
    try {
        const { data } = await axios.post('/events', eventData);
        //here we are descructuring and dispatching to the local state the same data that was send to the server 
        dispatch(createEvent(data))
    } catch (e) {
        console.log('This did not work', e.message)
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
    try {
        const { data } = await axios.patch(`/events/update/${id}`, updates);

        dispatch(updateEvent(data))
    } catch (e) {
        console.log('This did not work', e.message)
    }
}