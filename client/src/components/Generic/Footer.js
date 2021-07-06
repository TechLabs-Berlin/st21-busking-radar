import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {

    return (
        <div className='footer'>
            <NavLink className='nav-link' to='/privacy'>Privacy</NavLink>
            <NavLink className='nav-link' to='/faq'>FAQ</NavLink>
            <NavLink className='nav-link' to='/about'>About</NavLink>
        </div>
    )
}

export default Footer;