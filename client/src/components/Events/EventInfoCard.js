import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { history } from '../../App';

const EventInfoCard = ({ creator,
    id,
    createdAt,
    name,
    genre,
    time,
    about,
    tags,
    location,
    active
}) => {

    return (
        <div id='event-cd' className='event-cd'>
            <div className='event-cd-info'>
                <h1 id='hd-event-cd' className='hd-lg'>{name}</h1>
                <p>genre:{genre}</p>
                <p>location:{location}</p>
                <p>time: {time}</p>
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
                    <Button size='small' onClick={() => { }}>
                        <DeleteIcon fontSize='small' />
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EventInfoCard;