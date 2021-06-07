import React from 'react';
import EventForm from './EventForm';
import { useDispatch } from 'react-redux';
import { startCreateEvent } from '../../actions/events';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const CreateEvent = ({ history }) => {
    const dispatch = useDispatch();
    const { search } = useLocation()
    const { locationName, longitude, latitude } = queryString.parse(search)
    const newLocation = [locationName, longitude, latitude]
    return (
        <div>
            <main id='create-event' className='create-event'>
                <h1 id='hd-create-event' className='hd-lg'>Create Event</h1>
                <EventForm
                    newLocation={newLocation}
                    handleSubmit={(eventData) => {
                        dispatch(startCreateEvent(eventData));
                        history.push('/events')
                    }
                    } />
            </main>
        </div>
    )
}

export default CreateEvent;

