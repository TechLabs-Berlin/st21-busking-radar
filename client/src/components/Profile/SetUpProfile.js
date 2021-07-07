import React from 'react';
import EditProfileForm from './EditProfileForm';
import { useSelector } from 'react-redux';


const SetUpProfile = ({ match, history }) => {
    const auth = useSelector(state => state.auth)
    const navigateToProfile = () => {
        history.push('/profile')
    }
    return (
        <main className='prof-setup'>
            <button className='btn-back' onClick={navigateToProfile}><i class="fas fa-2x fa-chevron-left icon-color"></i>
            </button>
            <h2 className='hd-md' >Edit Profile</h2>
            <EditProfileForm auth={auth}
                userId={match.params.id}
            />
        </main>
    )
}

export default SetUpProfile;