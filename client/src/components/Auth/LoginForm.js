import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import { login } from '../../actions/auth';
import { clearErrors } from '../../actions/error';



const LoginForm = (props) => {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error)
    const [userData, setUserData] = useState({
        password: props.user ? props.user.password : '', // I will have to change that once we have the user authetication and users
        email: props.user ? props.user.email : '',
        error: ''
    })
    const auth = useSelector(state => state.auth)

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
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(userData))
        // if (userData.email && userData.password && auth.isAuthenticated) {
        //     dispatch(clearErrors())
        // }
    }
    useEffect(() => {
        //I can't find the better solution now. If you have time later, you should think about it. 
        //the conditional push up there does not work, due to the scope. When we push the button, the whoe handle submit happens within
        //the scope of that function, which means the auth.isAuthenticated will be null, as the login has not happened yet. 
        if (auth.isAuthenticated)
            props.history.push(`/events`)
    }, [auth])

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
