import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LoginForm from '../Auth/LoginForm';
import { clearErrors } from '../../actions/error';

const Home = () => {
    const auth = useSelector(state => state.auth)
    const history = useHistory();
    const { state } = useLocation();
    const navToEvents = () => {
        history.push('/events')
    }
    const navToRegistration = () => {
        history.push('/registration')
    }

    return (
        <div className='landing'>
            <div className='logo-containter'>logo image</div>
            <p className='text-sub'>Made for Buskers and Fans with Love by Techlabs Busking Radar Team!</p>
            {state ? <h2 className='text-sub'>Please sign in to create event</h2> : <h2>Sign In</h2>}
            <LoginForm
                history={history}
                auth={auth}
            />
            <div className='sign-up'>
                <p>Not a member?</p>
                <Button className='btn-lg' onClick={navToRegistration}>Sign Up</Button>
            </div>
            <p>or</p>
            <Button onClick={navToEvents}> Enter as a guest </Button>
        </div>
    )
}

export default Home