import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { clearErrors } from '../../actions/error';



const LoginForm = (props) => {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error)
    const [userData, setUserData] = useState({
        password: '', // I will have to change that once we have the user authetication and users
        email: '',
        error: '',
        loggedIn: false
    })



    //changing clear errors
    useEffect(() => {
        //return function is similar to the component will unmount in the class components

        return () => {
            dispatch(clearErrors())
        }
    }, [dispatch])
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
        setUserData({ ...userData, loggedIn: true })
    }

    return (
        <form className='form login' onSubmit={handleSubmit}>
            {userData.error && <p>{userData.error}</p>}
            <input className='input login-input' type="text" placeholder="Email" name="email" autoFocus value={userData.email || ''} onChange={handleChange} />
            <input className='input login-input' type="password" placeholder="Password" name="password" autoFocus value={userData.password || ''} onChange={handleChange} />
            <button type='submit' className='btn-lg btn-sign-in' size='small'>
                Sign In
            </button>
        </form>
    )
}

export default LoginForm
