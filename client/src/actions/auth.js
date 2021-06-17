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
    }).catch(e => {
        dispatch(returnErrors(e.response.data, e.response.status))
        dispatch({ type: 'AUTH_ERROR' })
    })


}

//register user 

const registerSuccess = (userData) => {
    return {
        type: 'REGISTER_SUCCESS',
        userData
    }
}

export const register = (userData) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //Request body
    const body = JSON.stringify(userData)
    axios.post('/user', body, config).then((res) => {
        return dispatch(registerSuccess(res.data))
    }).catch(e => {
        dispatch(returnErrors(e.response.data, e.response.status, 'REGISTER_FAIL'))
        dispatch({ type: 'REGISTER_FAIL' })
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