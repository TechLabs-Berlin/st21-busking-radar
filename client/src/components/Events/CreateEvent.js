import React from 'react';
import EventForm from './EventForm';
import { useDispatch } from 'react-redux';
import { startCreateEvent } from '../../actions/events';
import { history } from '../../App';

const CreateEvent = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <main id='create-event' className='create-event'>
                <h1 id='hd-create-event' className='hd-lg'>Create Event</h1>
                <EventForm handleSubmit={(eventData) => {
                    dispatch(startCreateEvent(eventData));
                    console.log(eventData)
                    history.push('/events')
                }
                } />
            </main>
        </div>
    )
}

export default CreateEvent;