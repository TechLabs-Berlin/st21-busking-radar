import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Logout from '../Auth/Logout';


const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const history = useHistory();
    const auth = useSelector((state) => state.auth)
    const navToLogin = () => {
        history.push('/')
    }
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }
    return (
        <div className='menu'>
            <div className={`menu-btn ${showMenu && 'close'}`} onClick={toggleMenu}>
                <div className='btn-line'></div>
                <div className='btn-line'></div>
                <div className='btn-line btn-line-last'></div>
            </div>
            <button onClick={() => {
                history.push('/settings')
            }} className='btn-settings'>
                <i class="fas fa-2x fa-cog icon-color"></i>
            </button>
            <header id='menu-nav' className={`menu-nav ${showMenu && 'show'}`} >
                {auth.isAuthenticated && <p className='text-sub'>Welcome, {auth.user.name} </p>}
                <NavLink activeClassName='is-active' className='nav-link' to='/' exact={true} onClick={toggleMenu}>Home</NavLink>
                <NavLink activeClassName='is-active' className='nav-link' to='/events' onClick={toggleMenu}>Events</NavLink>
                {auth.isAuthenticated && <NavLink activeClassName='is-active' className='nav-link' to='/profile' onClick={toggleMenu}>My Profile</NavLink>}
                <NavLink activeClassName='is-active' className='nav-link' to='/buskers' onClick={toggleMenu}>Buskers</NavLink>
                {auth.isAuthenticated ? <Logout history={history} toggleMenu={toggleMenu} /> :
                    <button className='btn-lg' onClick={() => {
                        navToLogin()
                        toggleMenu()
                    }}>
                        Sign In
                    </button>}
            </header>
        </div >
    )
}

export default Header