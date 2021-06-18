import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { Button } from '@material-ui/core';

const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLogout = () => {
        dispatch(logout());
        history.push('/')
    }

    return (
        <Button size='small' className='btn-lg' onClick={handleLogout} >
            Logout
        </Button>
    )

}

export default Logout;