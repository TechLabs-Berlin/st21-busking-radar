import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import LoginForm from '../Auth/LoginForm';

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
        <main className='landing'>
            <div className='logo'></div>
            <div className='bg-home'><div className='blur'></div></div>
            <p className='text-sub'>Made for Buskers and Fans with Love by Techlabs Busking Radar Team!</p>
            {state ? <h2 className='hd-md hd-md-home'>Please sign in to create event</h2> : <h2 className='hd-md hd-md-home'>Sign In</h2>}
            <LoginForm
                history={history}
                auth={auth}
            />
            <div className='sign-up'>
                <p>Not a member?</p>
                <button className='btn-sm' onClick={navToRegistration}>Sign Up</button>
            </div>
            <div className='guest'>
                <p className='text-p'>or</p>
                <button className='btn-lg' onClick={navToEvents}> Enter as a guest </button>
            </div>
        </main>
    )
}

export default Home