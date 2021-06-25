import React from 'react';
import moment from 'moment';
import EventInfoCard from '../Events/EventInfoCard';


const EventsList = ({ sortedEvents, auth }) => {
    return (
        <div className='profile-events-list'>
            <h2>My Events</h2>
            {sortedEvents.length === 0 && <p>You don't have any events</p>}
            {sortedEvents.map(event =>
                <EventInfoCard
                    key={event._id}
                    creator={event.creator}
                    date={moment(event.startTime).format('MMMM Do YYYY')}
                    id={event._id}
                    name={event.name}
                    genre={event.genre}
                    startTime={moment(event.startTime).format('h:mm:ss a')}
                    endTime={moment(event.endTime).format('h:mm:ss a')}
                    about={event.about}
                    tags={event.tags}
                    location={event.locationName}
                    active={event.active}
                    authUserId={auth.user._id}
                    userId={event.userId}
                    isAuthenticated={auth.isAuthenticated}
                />)}
        </div>
    )
}

export default EventsList