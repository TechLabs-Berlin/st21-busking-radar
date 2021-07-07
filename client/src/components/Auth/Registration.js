import React, { useState } from 'react';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RegForm from './RegForm';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


//material ui modal styles
// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

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
        width: '80%',
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
        <main className='reg-container'>
            <div className='logo'></div>
            <div className='bg-home'><div className='blur'></div></div>
            <h2 className='hd-md hd-md-home'>Sign Up</h2>
            <RegForm handleModal={handleModal} history={history} />
            <Modal
                open={openModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={() => setOpenModal(false)}
            >
                <div style={modalStyle} className={`${classes.paper} modal-container`} >
                    <CheckCircleIcon style={{ fill: 'rgba(164, 74, 63, 0.87)', fontSize: '50' }} />
                    <h2 className='hd-md' >Amazing!</h2>
                    <p className='text-sub'>You can create events and share  them with your fans</p>
                    <button className='btn-lg' onClick={() => {
                        history.push({
                            pathname: '/profile',
                            state: { from: '/registration' }
                        })
                    }}>Continue</button>
                </div>
            </Modal>
        </main>
    )
}

export default Registration;