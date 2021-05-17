import React, { useState } from 'react';
import axios from 'axios';

const Header = () => {
    const [userName, setUserName] = useState('')
    const getData = async () => {
        const res = await axios.get('http://localhost:8080/user')
        console.log(res)
    }



    return (
        <div className='menu'>
            <header>
                <p>{getData}</p>
            </header>
        </div>
    )
}

export default Header