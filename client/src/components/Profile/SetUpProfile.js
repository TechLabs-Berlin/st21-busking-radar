import { Button } from '@material-ui/core';
import React from 'react';
import EditProfileForm from './EditProfileForm';
import { useSelector } from 'react-redux';


const SetUpProfile = ({ match }) => {
    const auth = useSelector(state => state.auth)
    return (
        <div className='profile-setup'>
            <h2 className='hd-md' >{auth.user.name}</h2>
            <EditProfileForm auth={auth}
                userId={match.params.id}
            />
        </div>
    )
}

export default SetUpProfile;