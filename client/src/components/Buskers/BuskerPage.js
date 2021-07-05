import React, { useLayoutEffect } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import EventInfoCard from '../Events/EventInfoCard';
import selectEvents from '../../filters/events';
import { startGetUsers } from '../../actions/users';
import { startGetAllEvents } from '../../actions/events';

const BuskerPage = ({ match, history }) => {
    const dispatch = useDispatch();
    const { search } = useLocation();
    const { name, genre, socialLinks, about } = queryString.parse(search)
    const sortedEvents = useSelector(state => state.events.filter(event => event.userId === match.params.id))
    const filteredEvents = useSelector(state => selectEvents(sortedEvents, state.filters))
    const users = useSelector(state => state.users)
    const user = users.filter(user => user._id === match.params.id)[0]
    const links = JSON.parse(socialLinks)
    useLayoutEffect(() => {
        //this runs before the rendering
        dispatch(startGetUsers())
        dispatch(startGetAllEvents())
    }, [])
    return (
        <main className='prof-page'>
            <button className='btn-back' onClick={() => {
                history.goBack()
            }}><i class="fas fa-2x fa-chevron-left icon-color"></i>
            </button>
            <div className='prof-bg'></div>
            <div className='prof-pic-container'>
                {user && <img className='prof-pic' src={user.profilePic} />}
            </div>
            <h1>{name}</h1>
            <div className='soc-links-container'>
                {links.map(link => {
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
                <p className='prof-info-about'>{about}</p>
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
                        startTime={moment(event.startTime).format('H:mm')}
                        endTime={moment(event.endTime).format('H:mm')}
                        about={event.about}
                        tags={event.tags}
                        creator={event.creator}
                        active={event.active}
                    />
                })}
            </div>
        </main>
    )
}

export default BuskerPage;