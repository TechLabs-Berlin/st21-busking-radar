import React from 'react';
import EventInfoCard from './EventInfoCard';

const Events = () => {

    return (
        <div>
            <main id='events' className='events'>
                <h1 id='hd-events' className='hd-lg' >Events</h1>
                <EventInfoCard />
                <EventInfoCard />
            </main>
        </div>
    )
}

export default Events;