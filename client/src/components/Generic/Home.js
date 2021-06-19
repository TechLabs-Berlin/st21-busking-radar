import React from 'react';
import { Button } from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import HeadsetIcon from '@material-ui/icons/Headset';
import { useHistory } from 'react-router-dom';

const Home = ({ auth }) => {
    const history = useHistory();
    //Navigation
    const navToEvents = () => {
        history.push('/events')
    }
    const navToLogin = () => {
        if (!auth.isAuthenticated) {
            history.push('/login')
        } else {
            history.push('/events')
        }

    }

    return (
        <div className='landing'>
            <h1 className='hd-lg title-landing'>Busking Radar</h1>
            <p className='text-sub'>Made for Buskers and Fans with Love by Techlabs Busking Radar Team!</p>
            <h2>Who are you?</h2>
            <div className="buttons">
                <Button className='btn-lg' onClick={navToLogin}><MusicNoteIcon />Busker</Button>
                <Button className='btn-lg' onClick={navToEvents}><HeadsetIcon />Fan</Button>
            </div>
        </div>
    )
}

export default Home