import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EventForm from './EventForm';
import { startUpdateEvent } from '../../actions/events';

const UpdateEvent = ({ match, history }) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const events = useSelector((state) => state.events)
    const selectedEvent = events.find(event => {
        return event._id === match.params.id
    })
    return (
        <div className='create-event'>
            <h1>Update</h1>
            <EventForm
                auth={auth}
                event={selectedEvent}
                history={history}
                handleSubmit={((event) => {
                    dispatch(startUpdateEvent(selectedEvent._id, event))
                    history.push('/events')
                })}
            />
        </div>
    )
}

export default UpdateEvent