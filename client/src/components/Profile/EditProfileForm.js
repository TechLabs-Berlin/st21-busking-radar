import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { Button } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import { startUpdateUserInfo } from '../../actions/auth';
import { clearErrors } from '../../actions/error';



const EditProfileForm = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error)
    const [userData, setUserData] = useState({
        name: props.auth.user ? props.auth.user.name : '',
        email: props.auth.user ? props.auth.user.email : '',
        genre: props.auth.user ? props.auth.user.genre : '',
        about: props.auth.user ? props.auth.user.about : '',
        socialLinks: props.auth.user ? props.auth.user.socialLinks : '',
        selectedFile: props.auth.user ? props.auth.user.selectedFile : '',
        error: ''
    })
    const handleChange = (e) => {
        setUserData({
            ...userData,
            //this is the name of the element that we are targeting, depending on which input element
            [e.target.name]: e.target.value,
        })
    }
    const uploadImage = (event) => {
        const [imageFile] = event.target.files;
        const { type: mimeType } = imageFile;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);

        fileReader.onload = async (fileReaderEvent) => {
            const imageAsBase64 = fileReaderEvent.target.result;
            const image = new Image();
            image.src = imageAsBase64;
            const canvas = await document.createElement('canvas');
            canvas.width = '210'
            canvas.height = '230'
            const context = canvas.getContext('2d');
            if (image.naturalWidth > image.naturalHeight) {
                const wd = (230 * image.naturalWidth) / image.naturalHeight
                context.drawImage(image, -Math.abs(wd - 230) / 2, 0, wd, 230);
            } else {
                const ht = (230 * image.naturalHeight) / image.naturalWidth
                context.drawImage(image, 0, -Math.abs(ht - 230) / 2, 230, ht);
            }
            const resizedImageAsBase64 = canvas.toDataURL(mimeType, 0.5);
            // const blobImage = canvas.toBlob((blob)=>{

            // })
            // console.log(blobImage)
            console.log(resizedImageAsBase64)
            setUserData({ ...userData, selectedFile: resizedImageAsBase64 })
        };

    };


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(startUpdateUserInfo(userData, props.auth.user._id))
        history.push('/events')
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className='profile-edit' >
                <img src={userData.selectedFile} />
                <label>Name</label>
                <input type="text" placeholder="name" name="name" autoFocus value={userData.name || ''} onChange={handleChange} />
                <label>Genre</label>
                <input type="text" placeholder="genre" name="genre" autoFocus value={userData.genre || ''} onChange={handleChange} />
                <label>About</label>
                <input type="text" placeholder="about" name="about" autoFocus value={userData.about || ''} onChange={handleChange} />
                <div>
                    <label>Social links</label>
                    <select name="social-links" id=""></select>
                    <input type="text" placeholder="links" name="socialNetLinks" autoFocus value={userData.socialNetLinks || ''} onChange={handleChange} />
                </div>

                <p>Upload Image</p>
                <div className='file-input'>
                    <input type="file" accept="image/jpeg"
                        onChange={uploadImage} />
                </div>
            </div>
            <Button type='submit' className='btn-lg' size='small' >
                <PublishIcon />
                Submit
            </Button>
        </form>
    )
}

export default EditProfileForm