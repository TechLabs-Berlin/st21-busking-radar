import React from 'react';
import { NavLink } from 'react-router-dom';



const Settings = () => {
    return (
        <div className='settings-page'>
            <NavLink className='nav-link' to='/privacy'>Privacy</NavLink>
            <NavLink className='nav-link' to='/faq'>FAQ</NavLink>
            <NavLink className='nav-link' to='/about'>About</NavLink>
        </div>
    )
}

export default Settings;