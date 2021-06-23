import React from 'react';
import { useSelector } from 'react-redux';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EventsList from './EventsList';
import selectEvents from '../../filters/events';
import EventsFilters from '../Events/EventsFilters';


const MyProfile = ({ history }) => {
    const auth = useSelector(state => state.auth)
    const sortedEvents = useSelector(state => state.events.filter(event => event.userId === auth.user._id))
    const filteredEvents = useSelector(state => selectEvents(sortedEvents, state.filters))
    console.log(filteredEvents)
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
                <EventsList sortedEvents={filteredEvents}
                    auth={auth}
                />
            </div>
        </div>
    )
}

export default MyProfile;