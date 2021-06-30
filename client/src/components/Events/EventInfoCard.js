import React from 'react';
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { useDispatch } from 'react-redux';
import { startDeleteEvent } from '../../actions/events';
import RoomIcon from '@material-ui/icons/Room';

const EventInfoCard = ({ creator,
    date,
    id,
    name,
    genre,
    startTime,
    endTime,
    about,
    tags,
    location,
    userId,
    active,
    authUserId,
    isAuthenticated
}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <div id='event-cd' className='event-cd'>
            {active === true && <p>Event is happenning now!</p>}
            <h3 className='hd-sm event-name'>{name}</h3>
            <p className='event-creator'>{creator}</p>
            <p className='event-date'>{date}</p>
            <p className='event-time'>{startTime} - {endTime}</p>
            <p className='event-about'>{about}</p>
            <p className='event-tags'>{tags}</p>
            <p className='event-genre'>{genre}</p>
            <p className='event-location'><RoomIcon style={{ color: "rgba(164, 74, 63, 0.87)", width: "1rem", height: "1rem" }} />{location}</p>
            <div className='event-image'></div>

            {userId === authUserId && isAuthenticated ? < div className='event-cd-btn'>
                <Button className='btn-sm' size='small' onClick={() => {
                    history.push(`/events/update/${id}`)
                }}>
                    <UpdateIcon fontSize='small' />
                    Update
                </Button>
                <Button className='btn-sm' size='small' onClick={() => { dispatch(startDeleteEvent(id)) }}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
            </div> : ''}

        </div>
    )
}

export default EventInfoCard;