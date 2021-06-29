import React from 'react';
import moment from 'moment'
import { useSelector } from 'react-redux';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import EventInfoCard from '../Events/EventInfoCard';
import selectEvents from '../../filters/events';

const BuskerPage = ({ match }) => {

    const sortedEvents = useSelector(state => state.events.filter(event => event.userId === match.params.id))
    const filteredEvents = useSelector(state => selectEvents(sortedEvents, state.filters))
    const users = useSelector(state => state.users)
    const user = users.filter(user => user._id === match.params.id)[0]
    return (
        <div className='prof-page'>
            <div className='prof-pic-container'>
                <img className='prof-pic' src={user.profilePic} />
            </div>
            <h1>{user.name}</h1>
            <div className='soc-links-container'>
                {user.socialLinks.map(link => {
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
                <p className='prof-info-genre'>{user.genre}</p>
                <p className='prof-info-about'>{user.about}</p>
            </div>
            <div className='prof-info-events'>
                {filteredEvents.map(event => {
                    return <EventInfoCard
                        id={event._id}
                        key={event._id}
                        name={event.name}
                        genre={event.genre}
                        location={event.locationName}
                        date={moment(event.startTime).format('MMMM Do YYYY')}
                        startTime={moment(event.startTime).format('h:mm:ss a')}
                        endTime={moment(event.endTime).format('h:mm:ss a')}
                        about={event.about}
                        tags={event.tags}
                        creator={event.creator}
                        active={event.active}
                    />
                })}
            </div>
        </div>
    )
}

export default BuskerPage;