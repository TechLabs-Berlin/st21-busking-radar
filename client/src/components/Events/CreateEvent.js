import React from 'react';
import { useSelector } from 'react-redux';
import EventForm from './EventForm';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

const CreateEvent = () => {
    const auth = useSelector(state => state.auth)
    const history = useHistory();
    const { search } = useLocation();
    const { locationName, longitude, latitude } = queryString.parse(search)
    const newLocation = [locationName, longitude, latitude]
    return (
        <main id='create-event' className='create-event'>
            <div className='bg-home'><div className='blur'></div></div>
            <h1 id='hd-lg' className='hd-lg'>Create Event</h1>
            <EventForm
                auth={auth}
                newLocation={newLocation}
                history={history} />
        </main>

    )
}

export default CreateEvent;

