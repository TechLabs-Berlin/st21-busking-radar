import React from 'react';
import { Button } from '@material-ui/core';

const Login = ({ history }) => {
    //navigation
    const navToRegistration = () => {
        history.push('/registration')
    }

    return (
        <div>
            <h1 className="hd-lg">Busking Radar</h1>
            <p className='text-sub'>to continue, login</p>
            <div className="login">
                <input type='text' placeholder='email' />
                <input type='text' placeholder='pasword' />
                <Button className='btn-lg'>Login in with email</Button>
            </div>
            <div className='sign-up'>
                <p>Not a member?</p>
                <Button className='btn-lg' onClick={navToRegistration}>Sign Up</Button>
            </div>
        </div>
    )
}

export default Login