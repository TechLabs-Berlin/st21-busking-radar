import React from 'react';
import EditProfileForm from './EditProfileForm';
import { useSelector } from 'react-redux';


const SetUpProfile = ({ match }) => {
    const auth = useSelector(state => state.auth)
    return (
        <main className='prof-setup'>
            <h2 className='hd-md' >Edit Profile</h2>
            <EditProfileForm auth={auth}
                userId={match.params.id}
            />
        </main>
    )
}

export default SetUpProfile;