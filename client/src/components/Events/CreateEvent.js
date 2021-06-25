import React from 'react';
import EventForm from './EventForm';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

const CreateEvent = ({ auth }) => {
    const history = useHistory();
    const { search } = useLocation();
    const { locationName, longitude, latitude } = queryString.parse(search)
    const newLocation = [locationName, longitude, latitude]
    return (
        <div>
            <main id='create-event' className='create-event'>
                <h1 id='hd-create-event' className='hd-lg'>Create Event</h1>
                <EventForm
                    auth={auth}
                    newLocation={newLocation}
                    history={history} />
            </main>
        </div>
    )
}

export default CreateEvent;

