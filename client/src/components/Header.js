import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
    const [userName, setUserName] = useState('')

    axios.get('/user').then(res => {
        console.log(res.data)
    })



    return (
        <div className='menu'>
            <header>
                <p></p>
            </header>
        </div>
    )
}

export default Header