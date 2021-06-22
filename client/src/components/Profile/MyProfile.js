import React from 'react';
import { useSelector } from 'react-redux';

const MyProfile = () => {
    const auth = useSelector(state => state.auth)
    console.log(auth)
    return (
        <div className='profile-page'>
            <img src={auth.user.selectedFile} />
        </div>
    )
}

export default MyProfile;