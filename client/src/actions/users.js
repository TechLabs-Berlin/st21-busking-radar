
import axios from 'axios';
import { returnErrors } from './error';

const getUsers = (payload) => {
    return {
        type: 'GET_USERS',
        payload
    }
}

export const startGetUsers = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/user/getusers')
        dispatch(getUsers(data))
    } catch (e) {
        dispatch(returnErrors(e.message))
    }
}