import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
const Header = () => {
    const [userName, setUserName] = useState('')


    return (
        <div className='menu'>
            <header>
                <NavLink activeClassName='is-active' className='nav-link' to='/' exact={true}>Home</NavLink>
                <NavLink activeClassName='is-active' className='nav-link' to='/events'>Events</NavLink>
            </header>
        </div>
    )
}

export default Header