import React, { useLayoutEffect, useState } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import EventInfoCard from '../Events/EventInfoCard';
import { startGetUsers } from '../../actions/users';
import { startGetAllEvents } from '../../actions/events';

const BuskerPage = ({ match, history }) => {
    const now = moment();
    const [showEvents, setShowEvents] = useState('future')
    const dispatch = useDispatch();
    const { search } = useLocation();
    const { name, genre, socialLinks, about } = queryString.parse(search)
    const futureEvents = useSelector(state => state.events.filter(event => event.userId === match.params.id)).sort((a, b) => {
        return a.endTime < b.endTime ? -1 : 1
    }).filter(event => moment(event.endTime).unix() > now.unix())
    const pastEvents = useSelector(state => state.events.filter(event => event.userId === match.params.id)).sort((a, b) => {
        return a.endTime < b.endTime ? -1 : 1
    }).filter(event => moment(event.endTime).unix() < now.unix())
    const users = useSelector(state => state.users)
    const user = users.filter(user => user._id === match.params.id)[0]
    const links = JSON.parse(socialLinks)
    useLayoutEffect(() => {
        //this runs before the rendering
        dispatch(startGetUsers())
        dispatch(startGetAllEvents())
    }, [dispatch])
    return (
        <main className='prof-page' id='busker-page'>
            <button className='btn-back btn-back-buskers-page' onClick={() => {
                history.goBack()
            }}><i class="fas fa-2x fa-chevron-left icon-color"></i>
            </button>
            <div className='prof-bg bg-buskers-page'></div>
            <div className='prof-pic-container'>
                {user && <img className='prof-pic' src={user.profilePic} />}
            </div>
            <h1 className='hd-lg'>{name}</h1>
            <div className='soc-links-container'>
                {links.map(link => {
                    if (link.name === 'facebook') {
                        return <a href={link.link}><i key={link.link} class="fab fa-2x fa-facebook-square icon-color"></i> </a>
                    } else if (link.name === 'youtube') {
                        return <a href={link.link}><i key={link.link} class="fab fa-2x fa-youtube icon-color"></i></a>
                    } else {
                        return <a href={link.link}><i key={link.link} class="fab fa-2x fa-spotify icon-color"></i></a>
                    }
                })}
            </div>
            {genre === 'undefined' && about === 'undefined' ? <p>No info</p> : <div className='prof-info'>
                <p className='prof-info-genre'>{genre}</p>
                <p className='prof-info-about'>{about}</p>
            </div>}
            <div className='btns-container'>
                <button className='btn-md btn-events' onClick={() => setShowEvents('future')}>future events</button>
                <button className='btn-md btn-events' onClick={() => setShowEvents('past')}>past events</button>
            </div>
            {futureEvents.length === 0 || pastEvents === 0 ? <p>No events</p> : <div className='prof-info-events'>
                {showEvents === 'future' ? futureEvents.map(event => {
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
                })
                    :
                    pastEvents.map(event => {
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
                    })
                }
            </div>}
        </main>
    )
}

export default BuskerPage;