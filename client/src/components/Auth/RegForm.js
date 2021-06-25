import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import { register } from '../../actions/auth';
import { clearErrors } from '../../actions/error';



const RegForm = ({ handleModal }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth)
    const error = useSelector((state) => state.error)
    const [userData, setUserData] = useState({
        name: auth.user ? auth.user.name : '',
        password: auth.user ? auth.user.password : '', // I will have to change that once we have the user authetication and users
        email: auth.user ? auth.user.email : '',
        error: ''
    })

    useEffect(() => {
        if (error.id === 'REGISTER_FAIL') {
            setUserData({ error: error.msg.msg })
        } else {
            setUserData({ error: '' })
        }
    }, [error])

    useEffect(() => {
        if (auth.isAuthenticated)
            handleModal({
                open: true,
                userName: userData.name
            })
    }, [auth])
    //changing clear errors
    useEffect(() => {
        //return function is similar to the component will unmount in the class components
        return () => {
            dispatch(clearErrors())
        }
    }, [])
    const handleChange = (e) => {
        setUserData({
            ...userData,
            //this is the name of the element that we are targeting, depending on which input element
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register(userData))
    }


    return (
        <form onSubmit={handleSubmit}>
            {userData.error && <p>{userData.error}</p>}
            <input type="text" placeholder="name" name="name" autoFocus value={userData.name || ''} onChange={handleChange} />
            <p>Password</p>
            <input type="password" placeholder="password" name="password" autoFocus value={userData.password || ''} onChange={handleChange} />
            <p>Email</p>
            <input type="text" placeholder="email" name="email" autoFocus value={userData.email || ''} onChange={handleChange} />
            <Button type='submit' className='btn-lg' size='small' >
                <PublishIcon />
                Submit
            </Button>
        </form>
    )
}

export default RegForm
