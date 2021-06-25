import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { startUpdateUserInfo } from '../../actions/auth';



const EditProfileForm = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error)
    const [userData, setUserData] = useState({
        name: props.auth.user ? props.auth.user.name : '',
        email: props.auth.user ? props.auth.user.email : '',
        genre: props.auth.user ? props.auth.user.genre : '',
        about: props.auth.user ? props.auth.user.about : '',
        socialLinks: props.auth.user ? props.auth.user.socialLinks : [],
        profilePic: props.auth.user ? props.auth.user.profilePic : '',
        error: ''
    })
    const [socLink, setSocLink] = useState({
        name: 'facebook',
        link: ''
    })
    const handleSocLinkChange = (e) => {
        setSocLink({
            ...socLink,
            [e.target.name]: e.target.value,
        })
    }
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
            // console.log(blobImage) //later you should try change and save the image as blob image
            setUserData({ ...userData, profilePic: resizedImageAsBase64 })
        };

    };
    const navigateToProfile = () => {
        history.push('/profile')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(startUpdateUserInfo(userData, props.auth.user._id))
        history.push('/profile')
    }

    const saveSocLink = async (e) => {
        e.preventDefault()
        const filteredArr = await userData.socialLinks.filter(link => link.name !== socLink.name)
        setUserData({
            ...userData,
            socialLinks: [...filteredArr, socLink]
        })
        setSocLink({
            ...socLink,
            link: ''
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='profile-edit' >
                <img src={userData.profilePic} />
                <div className='file-input'>
                    <label>Upload Image</label>
                    <input type="file" accept="image/jpeg"
                        onChange={uploadImage} />
                </div>
                <label>Name</label>
                <input type="text" placeholder="name" name="name" autoFocus value={userData.name || ''} onChange={handleChange} />
                <label>Genre</label>
                <input type="text" placeholder="genre" name="genre" autoFocus value={userData.genre || ''} onChange={handleChange} />
                <label>About</label>
                <input type="text" placeholder="about" name="about" autoFocus value={userData.about || ''} onChange={handleChange} />
                <form className='soc-links-form'  >
                    <label>Social links</label>
                    {userData.socialLinks.map(link => <p>{link.name}: {link.link}</p>)}
                    <select name="name" value={socLink.name} id="soc-links" className='soc-links-select' onChange={handleSocLinkChange} >
                        <option value="facebook" className="soc-links-option">Facebook</option>
                        <option value="spotify" className="soc-links-option">Spotify</option>
                        <option value="youtube" className="soc-links-option">Youtube</option>
                    </select>
                    <input className='soc-links-input' type="text" placeholder="social link" name="link" autoFocus value={socLink.link || ''} onChange={handleSocLinkChange} />
                    <Button onClick={saveSocLink} >Save link</Button>
                </form>
            </div>
            <Button type='submit' className='btn-lg' size='small' >
                Save Changes
            </Button>
            <Button onClick={navigateToProfile}>Cancel</Button>
        </form>
    )
}

export default EditProfileForm