import React, { useState } from 'react';
import { Modal, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RegForm from './RegForm';


//material ui modal styles
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Registration = ({ history }) => {
    const [openModal, setOpenModal] = useState(false)
    const [userName, setUserName] = useState('')
    const handleModal = (open) => {
        setOpenModal(open.open)
        setUserName(open.userName)
    }
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    return (
        <div className='reg-container'>
            <RegForm handleModal={handleModal} />
            <Modal
                open={openModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={() => setOpenModal(false)}
            >
                <div style={modalStyle} className={classes.paper} >
                    <h2 id="simple-modal-title">Welcome, {userName} </h2>
                    <Button onClick={() => {
                        history.push({
                            pathname: '/profile',
                            state: { from: '/registration' }
                        })
                    }}>Continue</Button>
                </div>
            </Modal>
        </div>
    )
}

export default Registration;