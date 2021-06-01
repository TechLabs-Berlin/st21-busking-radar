import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { useDispatch } from 'react-redux';
import { startDeleteEvent } from '../../actions/events';

const EventInfoCard = ({ creator,
    date,
    id,
    createdAt,
    name,
    genre,
    startTime,
    endTime,
    about,
    tags,
    location,
    active,
    history
}) => {

    const dispatch = useDispatch();
    // const deleteEvent = () => {
    //     dispatch(startDeleteEvent(id))
    // }
    return (
        <div id='event-cd' className='event-cd'>
            <div className='event-cd-info'>
                <h1 id='hd-event-cd' className='hd-lg'>{name}</h1>
                <p>genre:{genre}</p>
                <p>location:{location}</p>
                <p>Date: {date} </p>
                <p>Start: {startTime}</p>
                <p>End: {endTime}</p>
                <p>about: {about}</p>
                <p>tags: {tags}</p>
                <p>created by: {creator}</p>
                <p>created at: {createdAt}</p>
                {active === true ? <p>Event is happenning now</p> : ''}
                <div className='event-cd-btn'>
                    <Button size='small' onClick={() => {
                        history.push(`/events/update/${id}`)
                    }}>
                        <UpdateIcon fontSize='small' />
                        Update
                    </Button>
                    <Button size='small' onClick={() => { dispatch(startDeleteEvent(id)) }}>
                        <DeleteIcon fontSize='small' />
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EventInfoCard;