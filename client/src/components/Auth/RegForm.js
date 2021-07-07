import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/auth';
import { clearErrors } from '../../actions/error';



const RegForm = ({ handleModal, history }) => {
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
    }, [auth, handleModal, userData.name])
    //changing clear errors
    useEffect(() => {
        //return function is similar to the component will unmount in the class components
        return () => {
            dispatch(clearErrors())
        }
    }, [dispatch])
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
    const navToHome = () => {
        history.push('/')
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            {userData.error && <p>{userData.error}</p>}
            <input className='input' type="text" placeholder="Name" name="name" autoFocus value={userData.name || ''} onChange={handleChange} />
            <input className='input' type="password" placeholder="Password" name="password" autoFocus value={userData.password || ''} onChange={handleChange} />
            <input className='input' type="text" placeholder="Email" name="email" autoFocus value={userData.email || ''} onChange={handleChange} />
            <div className='sign-in'>
                <p>Already a member?</p>
                <button className='btn-sm' onClick={navToHome}>Sign In</button>
            </div>
            <button type='submit' className='btn-lg' size='small' >
                Submit
            </button>
        </form>
    )
}

export default RegForm
