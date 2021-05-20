import React from 'react';
import EventForm from './EventForm';

const Event = () => {

    return (
        <div>
            <main id='create-event' className='create-event'>
                <h1 id='hd-create-event' className='hd-lg'>Create Event</h1>
                <EventForm />
            </main>
        </div>
    )
}

export default Event;