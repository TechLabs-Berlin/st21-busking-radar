import React, { useEffect, useState } from 'react';
import axios from 'axios'

const RegisterPage = () => {

    // axios.get('/test').then((data) => {
    //     console.log(data)
    // })

    const [state, setState] = useState({
        name: '',
        password: '',
        error: ''
    })
    const handleChange = (e) => {
        setState({
            ...state,
            //this is the name of the element that we are targeting, depending on which input element
            //
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name: state.name,
            password: state.password
        }
        if (!state.name) {
            setState({ error: 'Please provide user name' })
        } else if (!state.password) {
            setState({ error: 'Please provide password' })
        } else if ({ error: '' }) {
           console.dir(userData)
            // axios.post('/login', { userData })
        }
    }

    return (
        <div className='reg-page'>
            <div>{state.error}</div>
            <form onSubmit={handleSubmit}>
                <p>UserName</p>
                <input type='text' name='name' placeholder='Enter your user name' onChange={handleChange} />
                <p>Password</p>
                <input type='text' name='password' placeholder='Enter your password' onChange={handleChange} />
                <button>Login</button>
            </form>
        </div>
    );
}

export default RegisterPage;
