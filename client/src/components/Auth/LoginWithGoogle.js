import React from 'react';
import { Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../actions/auth';


const LoginWithGoogle = () => {
    const dispatch = useDispatch();

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
        <div className='login-google'>
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
        </div>
    )
}
