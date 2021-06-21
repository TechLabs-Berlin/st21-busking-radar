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
        history.push('/login')
    }
    return (
        <div className='menu'>
            <header>
                <NavLink activeClassName='is-active' className='nav-link' to='/' exact={true}>Home</NavLink>
                <NavLink activeClassName='is-active' className='nav-link' to='/events'>Events</NavLink>
                {auth.isAuthenticated ? <div className='nav-user'><p>Welcome, {auth.name} </p> <Logout /></div> :
                    <Button onClick={navToLogin}>
                        Sign In
                    </Button>}
            </header>
        </div >
    )
}

export default Header