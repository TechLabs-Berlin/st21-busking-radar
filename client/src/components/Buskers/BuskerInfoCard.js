import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

const BuskerInfoCard = ({ name, profilePic, socialLinks, genre, about, history, id }) => {
    return (
        <div className='busker-info-card' onClick={() => {
            history.push({
                pathname: `/busker/${id}`,
                search: `?name=${name}&socialLinks=${JSON.stringify(socialLinks)}&genre=${genre}&about=${about}`
            })
        }} >
            <div className='text-info'>
                <h3 className='hd-sm'>{name}</h3>
                <div className='soc-links-container' >
                    {socialLinks.map(link => {
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
                    <p className='prof-info-genre'>{genre}</p>
                </div>
            </div>
            <div className='prof-pic-container'>
                <img className='prof-pic' src={profilePic} />
            </div>
        </div>
    )
}

export default BuskerInfoCard;