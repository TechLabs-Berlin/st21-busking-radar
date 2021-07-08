import axios from 'axios';
import { returnErrors } from './error';



//user loading



const userLoading = () => {
    return {
        type: 'USER_LOADING'
    }
}

const userLoaded = (payload) => {
    return {
        type: 'USER_LOADED',
        payload
    }
}

//check token and load user
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch(userLoading());

    axios.get('/api/auth', tokenConfig(getState)).then((res) => {
        // const userData = JSON.parse(res.data)
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

export const register = (payload) => (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    //Request body
    const body = JSON.stringify(payload)
    axios.post('/api/user', body, config).then((res) => {
        localStorage.setItem("token", res.data.token)
        dispatch(registerSuccess(res.data))

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

// login user

const loginSuccess = (userData) => {
    return {
        type: 'LOGIN_SUCCESS',
        userData
    }
}

export const login = ({ email, password }) => (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    //Request body
    const body = JSON.stringify({ email, password })
    axios.post('/api/auth', body, config).then((res) => {
        localStorage.setItem("token", res.data.token)
        return dispatch(loginSuccess(res.data))
    }).catch(e => {
        dispatch(returnErrors(e.response.data, e.response.status, 'LOGIN_FAIL'))
        dispatch({ type: 'LOGIN_FAIL' })
    })

}


export const logout = () => {
    return {
        type: 'LOGOUT_SUCCESS',
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


// const updateUserInfo = (updates) => {
//     return {
//         type: 'UPDATE_USER_INFO',
//         updates
//     }
// }

export const startUpdateUserInfo = (updates, id) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify(updates)
        axios.patch(`/api/user/update/${id}`, body, tokenConfig(getState))
        dispatch(userLoaded(updates))
    } catch (e) {
        console.log(e, 'this did not work')
    }

}