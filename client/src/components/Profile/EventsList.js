import React from 'react';
import moment from 'moment';
import EventInfoCard from '../Events/EventInfoCard';


const EventsList = ({ sortedEvents, auth }) => {
    return (
        <div className='prof-events-ls'>
            {sortedEvents.length === 0 && <p>You don't have any events</p>}
            {sortedEvents.map(event =>
                <EventInfoCard
                    key={event._id}
                    creator={event.creator}
                    date={moment(event.startTime).format('MMMM Do YYYY')}
                    id={event._id}
                    name={event.name}
                    genre={event.genre}
                    startTime={moment(event.startTime).format('H:mm')}
                    endTime={moment(event.endTime).format('H:mm')}
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