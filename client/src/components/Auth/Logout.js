import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../actions/auth';

const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLogout = () => {
        dispatch(logout());
        history.push('/')
    }

    return (
        <button className='btn-lg' onClick={handleLogout} >
            Logout
        </button>
    )

}

export default Logout;