import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import { Button } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';



const RegForm = (props) => {
    const [userData, setUserData] = useState({
        name: props.user ? props.user.name : '',
        creator: props.user ? props.user.password : 'anomymous', // I will have to change that once we have the user authetication and users
        genre: props.user ? props.user.email : '',
        about: props.user ? props.user.genre : '',
        tags: props.user ? props.user.about : '',
        startTime: props.user ? props.user.links : '',
        endTime: props.user ? props.user.file : '',
        error: ''
    })
    const handleChange = (e) => {
        setUserData({
            ...userData,
            //this is the name of the element that we are targeting, depending on which input element
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = () => {

    }
    return (
        <form onSubmit={handleSubmit}>
            <p>User name:</p>
            <input type="text" placeholder="username" name="username" autoFocus value={userData.name || ''} onChange={handleChange} />
            <p>Password</p>
            <input type="text" placeholder="password" name="password" autoFocus value={userData.password || ''} onChange={handleChange} />
            <p>Email</p>
            <input type="text" placeholder="email" name="email" autoFocus value={userData.email || ''} onChange={handleChange} />
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
            <Button type='submit' className='btn-lg' size='small'>
                <PublishIcon />
                Submit
            </Button>
        </form>
    )
}

export default RegForm
