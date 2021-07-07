import React from 'react';
import { NavLink } from 'react-router-dom';



const Settings = ({ history }) => {
    return (
        <div className='settings-page'>
            <button className='btn-sm btn-back' onClick={() => {
                history.goBack()
            }}><i class="fas fa-2x fa-chevron-left icon-color"></i>
            </button>
            <NavLink className='nav-link' to='/privacy'>Privacy</NavLink>
            <NavLink className='nav-link' to='/faq'>FAQ</NavLink>
            <NavLink className='nav-link' to='/about'>About</NavLink>
        </div>
    )
}

export default Settings;