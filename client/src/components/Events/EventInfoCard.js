import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import RoomIcon from '@material-ui/icons/Room';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { startDeleteEvent } from '../../actions/events';


//material ui modal styles
function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '90%',
        height: '50vh',
        fontSize: '1.2em',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '20px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
}));


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
    const [openModal, setOpenModal] = useState(false)
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    return (
        <div id='event-cd' className='event-cd'>
            {active === true && <p>Event is happenning now!</p>}
            <h3 className='hd-sm event-name'>{name}</h3>
            <p className='event-creator'>{creator}</p>
            <p className='event-date'>{date}</p>
            <p className='event-time'>{startTime} - {endTime}</p>
            <p className='event-about'>{about}</p>
            <p className='event-genre'>{genre}</p>
            <p className='event-location'><RoomIcon style={{ color: "rgba(164, 74, 63, 0.87)", width: "1rem", height: "1rem" }} />{location}</p>
            <div className='event-image'></div>

            {userId === authUserId && isAuthenticated ? <div className='event-cd-btn'>
                <button className='btn-cd' size='small' onClick={() => {
                    history.push(`/events/update/${id}`)
                }}>
                    Update
                </button>
                <button className='btn-cd btn-delete' size='small' onClick={() => { setOpenModal(!openModal) }}>

                    Delete
                </button>
            </div> : ''}
            <Modal
                open={openModal}
                onClose={() => {
                    setOpenModal(!openModal)
                }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={`${classes.paper} modal-container`} >
                    <p id="simple-modal-title" className='text-sub'>Are you sure you would like to delete this event?</p>
                    <button className='btn-lg' onClick={() => {
                        dispatch(startDeleteEvent(id))
                        setOpenModal(!openModal)
                    }}>Delete</button>
                    <button className='btn-lg' onClick={() => { setOpenModal(!openModal) }}>Cancel</button>}
                </div>
            </Modal>
        </div>
    )
}

export default EventInfoCard;