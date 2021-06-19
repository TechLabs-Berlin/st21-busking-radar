import { Button } from '@material-ui/core';
import React from 'react';
import EditProfile from './EditProfile';
import { useHistory } from 'react-router-dom';

const SetUpProfile = ({ auth }) => {
    const history = useHistory();
    const navigateToEvents = () => {
        history.push('/events')
    }
    return (
        <div className='profile-setup'>
            <h2 className='hd-md' >Your Profile</h2>
            <p className='text-sub'>Please finish setting up your profile to help fans to discover your music</p>
            <Button onClick={navigateToEvents}>Do it later and continue to events</Button>
            <EditProfile user={auth} />
        </div>
    )
}

export default SetUpProfile;