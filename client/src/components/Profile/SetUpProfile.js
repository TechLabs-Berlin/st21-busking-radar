import { Button } from '@material-ui/core';
import React from 'react';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const SetUpProfile = ({ history, match }) => {
    const navigateToEvents = () => {
        history.push('/events')
    }
    const auth = useSelector(state => state.auth)
    return (
        <div className='profile-setup'>
            <h2 className='hd-md' >Your Profile</h2>
            <p className='text-sub'>Please finish setting up your profile to help fans to discover your music</p>
            <Button onClick={navigateToEvents}>Do it later and continue to events</Button>
            <EditProfile user={auth.user}
                userId={match.params.id}
            />
        </div>
    )
}

export default SetUpProfile;