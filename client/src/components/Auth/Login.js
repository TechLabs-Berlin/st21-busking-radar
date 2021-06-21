import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import LoginForm from './LoginForm';
import { useLocation } from 'react-router-dom';

const Login = ({ history }) => {
    //navigation
    const navToRegistration = () => {
        history.push('/registration')
    }
    const { state } = useLocation();
    const googleSuccess = async (res) => {
        // const result = res?.profileObj; //< ? <- this is needed in order to avoid the error, the function will through undefined instead
        // const token = res?.tokenId;
        // try {
        //     dispatch(signInWithGoogle({ result, token }));
        //     history.push('/events')
        // } catch (e) {
        //     console.log(e, 'This did not work!')
        // }
    }
    const googleFailure = (e) => {
        console.log(e, 'Google Sign In failed. Try again later')
    }

    const handleSubmit = () => {

    }

    return (
        <div>
            <h1 className="hd-lg">Busking Radar</h1>
            {state ? <p className='text-sub'>Please login to create event</p> : <p className='text-sub'>to continue, login</p>}
            <LoginForm
                history={history}
            />
            <div className='sign-up'>
                <p>Not a member?</p>
                <Button className='btn-lg' onClick={navToRegistration}>Sign Up</Button>
            </div>
        </div>
    )
}

export default Login