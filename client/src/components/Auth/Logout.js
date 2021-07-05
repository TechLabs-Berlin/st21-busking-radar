import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const Logout = ({ history, toggleMenu }) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        history.push('/');
        toggleMenu()
    }

    return (
        <button className='btn-lg' onClick={handleLogout} >
            Logout
        </button>
    )

}

export default Logout;