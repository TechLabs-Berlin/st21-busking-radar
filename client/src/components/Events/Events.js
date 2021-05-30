import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { startGetAllEvents } from '../../actions/events';
import { Button } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Grid, CircularProgress } from '@material-ui/core';
import EventInfoCard from './EventInfoCard';
import EventsMap from './EventsMap';
// import WrappedMap from './EventsMap';
//polling mechanism

// <WrappedMap
// googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
// loadingElement={<div style={{ height: '100%', width: '100%' }} />}
// containerElement={<div style={{ height: '100%', width: '100%' }} />}
// mapElement={<div style={{ height: '100%', width: '100%' }} />}
// />


const Events = ({ history }) => {
    //supporting hooks 
    //useDispatch is a new hook that replaced mapDispatchToProps. The Question, however, is how can we write a 
    //test for it. Is it possible? Check it out later for sure!!!)
    // const dispatch = useDispatch();
    //Navigation
    const [showList, setShowList] = useState(false)
    const handleShowList = () => {
        setShowList(!showList)
    }

    const createEvent = () => {
        history.push('/events/create')
    }
    //fetching events
    //useSelector here is a new hook, which replaces the mapStateToProps middleware
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startGetAllEvents())
    }, [])
    const events = useSelector((state) => state.events)
    return (
        <main id='events' className='events'>
            <div className='events-top'>
                <h1 id='hd-events' className='hd-lg' >Events</h1>
                <Button size='small' onClick={createEvent}>
                    <AddBoxIcon fontSize='small' />
                    Create Event
                </Button>
                <Button size='small' onClick={handleShowList}><KeyboardArrowDownIcon /> Show Events List</Button>
            </div>
            {events.length === 0 ? <CircularProgress /> : showList &&
                <div className='events-ls' container alignItems='stretch' direction='row' spacing={3}>
                    {events.map((event => {
                        return <Grid item xs={10} sm={8}>
                            <EventInfoCard
                                id={event._id}
                                key={event._id}
                                name={event.name}
                                genre={event.genre}
                                location={event.location}
                                date={moment(event.startTime).format('MMMM Do YYYY')}
                                startTime={moment(event.startTime).format('h:mm:ss a')}
                                endTime={moment(event.endTime).format('h:mm:ss a')}
                                about={event.about}
                                tags={event.tags}
                                creator={event.creator}
                                createdAt={moment(event.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                active={event.active}
                            />
                        </Grid>
                    }))}
                </div>}
            <div className='events-map'>
                <EventsMap events={events} />
            </div>
        </main >
    )
};



export default Events;

