import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import { login } from '../../actions/auth';
import { clearErrors } from '../../actions/error';



const LoginForm = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error)
    const [userData, setUserData] = useState({
        password: props.user ? props.user.password : '', // I will have to change that once we have the user authetication and users
        email: props.user ? props.user.email : '',
        error: ''
    })

    //changing clear errors
    useEffect(() => {
        //return function is similar to the component will unmount in the class components
        return () => {
            dispatch(clearErrors())
        }
    }, [])
    useEffect(() => {
        if (error.id === 'LOGIN_FAIL') {
            setUserData({ error: error.msg.msg })
        } else {
            setUserData({ error: '' })
        }
    }, [error])


    const handleChange = (e) => {
        setUserData({
            ...userData,
            //this is the name of the element that we are targeting, depending on which input element
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(login(userData))
        if (userData.email && userData.password) {
            dispatch(clearErrors())
            history.push('/events')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {userData.error && <p>{userData.error}</p>}
            <p>Email</p>
            <input type="text" placeholder="email" name="email" autoFocus value={userData.email || ''} onChange={handleChange} />
            <p>Password</p>
            <input type="password" placeholder="password" name="password" autoFocus value={userData.password || ''} onChange={handleChange} />
            <Button type='submit' className='btn-lg' size='small'>
                <PublishIcon />
                Login
            </Button>
        </form>
    )
}

export default LoginForm
