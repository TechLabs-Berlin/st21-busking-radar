import React from 'react';
import EventForm from './EventForm';
import { useDispatch } from 'react-redux';
import { startCreateEvent } from '../../actions/events';

const CreateEvent = ({ history }) => {
    const dispatch = useDispatch();
    console.log(history.location.newLocation)
    return (
        <div>
            <main id='create-event' className='create-event'>
                <h1 id='hd-create-event' className='hd-lg'>Create Event</h1>
                <EventForm
                    newLocation={history.location.newLocation}
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