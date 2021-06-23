import React from 'react';
import { useSelector } from 'react-redux';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';


const MyProfile = ({ history }) => {
    const auth = useSelector(state => state.auth)
    return (
        <div className='prof-page'>
            <Button onClick={() => {
                history.push(`/profile/${auth.user._id}`)
            }}><EditIcon />Edit Profile</Button>
            <div className='prof-pic-container'>
                <img className='prof-pic' src={auth.user.profilePic} />
            </div>
            <h2>{auth.user.name}</h2>
            <div className='soc-links-container'>
                {auth.user.socialLinks.map(link => {
                    if (link.name === 'facebook') {
                        return <a href={link.link}><FacebookIcon /> </a>
                    } else if (link.name === 'youtube') {
                        return <a href={link.link}><YouTubeIcon /></a>
                    } else {
                        return <a href={link.link}><MusicNoteIcon /></a>
                    }
                })}
            </div>
            <div className='prof-info'>
                <p className='prof-info-genre'>{auth.user.genre}</p>
                <p className='prof-info-about'>{auth.user.about}</p>
            </div>
            <div className='prof-info-events'>

            </div>
        </div>
    )
}

export default MyProfile;