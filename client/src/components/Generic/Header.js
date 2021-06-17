import React, { useState, useEffect, useDebugValue } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector((state) => state.auth)


    const startLogout = async () => {
        await dispatch(logout());
        setUser(null)
        history.push('/')
    }

    const navToLogin = () => {
        history.push('/login')
    }

    // useEffect(() => {
    //     const token = user?.token;

    //     //JWT

    //     setUser(JSON.parse(localStorage.getItem('profile')))
    // }, [])


    return (
        <div className='menu'>
            <header>
                <NavLink activeClassName='is-active' className='nav-link' to='/' exact={true}>Home</NavLink>
                <NavLink activeClassName='is-active' className='nav-link' to='/events'>Events</NavLink>
                {auth.userData !== null ? <div className='nav-user'><p>SignedIn as  { } </p> <Button onClick={startLogout} >Logout</Button> </div> :
                    <Button onClick={navToLogin}>
                        Sign In
                    </Button>}
            </header>
        </div >
    )
}

export default Header