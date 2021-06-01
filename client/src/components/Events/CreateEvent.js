import React from 'react';
import EventForm from './EventForm';
import { useDispatch } from 'react-redux';
import { startCreateEvent } from '../../actions/events';

const CreateEvent = ({ history }) => {
    const dispatch = useDispatch();
    console.log(history)
    return (
        <div>
            <main id='create-event' className='create-event'>
                <h1 id='hd-create-event' className='hd-lg'>Create Event</h1>
                <EventForm handleSubmit={(eventData) => {
                    dispatch(startCreateEvent(eventData));
                    history.push('/events')
                }
                } />
            </main>
        </div>
    )
}

export default CreateEvent;