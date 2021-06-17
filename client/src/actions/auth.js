import axios from 'axios';
import { returnErrors } from './error';
//user loading

const userLoading = () => {
    return {
        type: 'USER_LOADING'
    }
}

const userLoaded = (userData) => {
    return {
        type: 'USER_LOADED',
        userData
    }
}

//check token and load user
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch(userLoading());


    axios.get('/auth', tokenConfig(getState)).then((res) => {
        dispatch(userLoaded(res.data))
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({ type: 'AUTH_ERROR' })
    })


}



export const signInWithGoogle = (data) => {
    return {
        type: 'AUTH_WITH_GOOGLE',
        data
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT',
    }
}

export const tokenConfig = getState => {
    //get token  from local storage
    const token = getState().auth.token

    //Headers, to make sure we can pass the middleware 
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    //check if we have token
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}