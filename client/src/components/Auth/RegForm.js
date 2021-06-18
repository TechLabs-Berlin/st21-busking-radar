import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { Button } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import { register } from '../../actions/auth';
import { clearErrors } from '../../actions/error';



const RegForm = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const error = useSelector((state) => state.error)
    const [userData, setUserData] = useState({
        name: props.user ? props.user.name : '',
        password: props.user ? props.user.password : '', // I will have to change that once we have the user authetication and users
        email: props.user ? props.user.email : '',
        genre: props.user ? props.user.genre : '',
        tags: props.user ? props.user.about : '',
        links: props.user ? props.user.links : '',
        file: props.user ? props.user.file : '',
        error: ''
    })


    useEffect(() => {
        if (error.id === 'REGISTER_FAIL') {
            setUserData({ error: error.msg.msg })
        } else {
            setUserData({ error: '' })
        }
    }, [error])

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
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(register(userData))
        if (userData.name && userData.email && userData.password) {
            dispatch(clearErrors())
            history.push('/events')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {userData.error && <p>{userData.error}</p>}
            <p>User name:</p>
            <input type="text" placeholder="name" name="name" autoFocus value={userData.name || ''} onChange={handleChange} />
            <p>Password</p>
            <input type="password" placeholder="password" name="password" autoFocus value={userData.password || ''} onChange={handleChange} />
            <p>Email</p>
            <input type="text" placeholder="email" name="email" autoFocus value={userData.email || ''} onChange={handleChange} />
            {isAuthenticated &&
                <div className='userInfo'>
                    <p>Genre</p>
                    <input type="text" placeholder="genre" name="genre" autoFocus value={userData.genre || ''} onChange={handleChange} />
                    <p>About</p>
                    <input type="text" placeholder="about" name="about" autoFocus value={userData.about || ''} onChange={handleChange} />
                    <p>Links</p>
                    <input type="text" placeholder="links" name="links" autoFocus value={userData.links || ''} onChange={handleChange} />
                    <p>Upload Image</p>
                    <div className='file-input'>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setUserData({ ...userData, selectedFile: base64 })}
                        />
                    </div>
                </div>
            }
            <Button type='submit' className='btn-lg' size='small'>
                <PublishIcon />
                Submit
            </Button>
        </form>
    )
}

export default RegForm
