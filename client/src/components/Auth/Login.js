import React from 'react';
import { Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../actions/auth';

const Login = ({ history }) => {
    const dispatch = useDispatch();
    //navigation
    const navToRegistration = ({ history }) => {
        history.push('/registration')
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj; //< ? <- this is needed in order to avoid the error, the function will through undefined instead
        const token = res?.tokenId;
        try {
            dispatch(signInWithGoogle({ result, token }));
            history.push('/events')
        } catch (e) {
            console.log(e, 'This did not work!')
        }
    }
    const googleFailure = (e) => {
        console.log(e, 'Google Sign In failed. Try again later')
    }

    const handleSubmit = () => {

    }

    return (
        <div>
            <h1 className="hd-lg">Busking Radar</h1>
            <p className='text-sub'>to continue, login</p>
            <p>Login with google: </p>
            <GoogleLogin
                clientId="537769059752-k1hm1tth7u9bqond5mvilie345c0b7fo.apps.googleusercontent.com"
                render={(renderProps) => {
                    return (
                        <Button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            size='small'
                            variant='contained'
                        >
                            Google Sign In
                        </Button>
                    )
                }}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy='single_host_origin'
            />
            <form className="login" onSubmit={handleSubmit}>
                <input type='text' placeholder='email' />
                <input type='text' placeholder='pasword' />
                <Button className='btn-lg'>Login in with email</Button>
            </form>
            <div className='sign-up'>
                <p>Not a member?</p>
                <Button className='btn-lg' onClick={navToRegistration}>Sign Up</Button>
            </div>
        </div>
    )
}

export default Login