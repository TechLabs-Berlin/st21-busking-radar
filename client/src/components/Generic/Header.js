import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Logout from '../Auth/Logout';


const Header = () => {
    const history = useHistory();
    const auth = useSelector((state) => state.auth)
    const navToLogin = () => {
        history.push('/')
    }
    return (
        <div className='menu'>
            <header>
                <NavLink activeClassName='is-active' className='nav-link' to='/' exact={true}>Home</NavLink>
                <NavLink activeClassName='is-active' className='nav-link' to='/events'>Events</NavLink>
                {auth.isAuthenticated && <NavLink activeClassName='is-active' className='nav-link' to='/profile'>My Profile</NavLink>}
                <NavLink activeClassName='is-active' className='nav-link' to='/buskers'>Buskers</NavLink>
                {auth.isAuthenticated ? <div className='nav-user'><p>Welcome, {auth.user.name} </p> <Logout /></div> :
                    <Button onClick={navToLogin}>
                        Sign In
                    </Button>}
            </header>
        </div >
    )
}

export default Header