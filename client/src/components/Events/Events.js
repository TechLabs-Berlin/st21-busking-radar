import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { startGetAllEvents, startUpdateEvent } from '../../actions/events';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from '@material-ui/icons/Close';
import { Grid, CircularProgress, Button } from '@material-ui/core';
import EventInfoCard from './EventInfoCard';
import EventMap from './EventMap';
import Geocoder from './Geocoder';
import EventsFilters from './EventsFilters';
import selectEvents from './../../filters/events';
import { loadUser } from '../../actions/auth';



//polling mechanism
const Events = ({ history }) => {
    const [showList, setShowList] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [newLocation, setNewLocation] = useState(null)
    const [chooseLocation, setChooseLocation] = useState(false)
    const [clickedLocation, setClickedLocation] = useState([]);
    const [intervalMs, setIntervalMs] = useState(1000)
    //supporting hooks 
    //useDispatch is a new hook that replaced mapDispatchToProps. The Question, however, is how can we write a 
    //test for it. Is it possible? Check it out later for sure!!!)
    const dispatch = useDispatch();
    //useSelector here is a new hook, which replaces the mapStateToProps middleware
    //Fetching events!!!
    //auto fetching with react query
    const now = moment();
    const { status, data } = useQuery('events',
        async () => {
            const res = await axios.get('/events')
            return res.data.map(event => {
                if (moment(event.startTime).isSameOrBefore(now) &&
                    moment(event.endTime).isSameOrAfter(now) &&
                    event.active === false) {
                    return dispatch(startUpdateEvent(event._id, { ...event, active: true }))
                } else if (moment(event.endTime).isSameOrBefore(now) &&
                    event.active === true) {
                    return dispatch(startUpdateEvent(event._id, { ...event, active: false }))
                } else {
                    //setting the new interval so the react-query stopps autofetching 
                    //and starts only when we need to update the active status of the next closest in time event
                    let dates = []
                    for (let i = 0; i < res.data.length; i++) {
                        if (moment(res.data[i].startTime).unix() >= now.unix()) {
                            dates.push(moment(res.data[i].startTime).unix())
                        }
                    }
                    let neededInterval = (dates.sort()[0] - now.unix()) * 1000
                    setIntervalMs(neededInterval);
                    dispatch(startGetAllEvents())
                }
            })

        }
        , {
            refetchInterval: intervalMs
        })

    const events = useSelector((state) => selectEvents(state.events, state.filters))
    const createEvent = () => {
        setChooseLocation(true)
        setShowFilters(false)
        setShowList(false)
        setClickedLocation([])
    }
    //Handlers
    const handleShowFilters = () => {
        setShowFilters(!showFilters)
        setShowList(false)
    }
    //confirm the choice of the new location logic
    const handleConfirmChoice = () => {
        if (newLocation) {
            history.push({
                pathname: `/events/create`,
                search: `?locationName=${newLocation.name}&longitude=${newLocation.long}&latitude=${newLocation.lat}`,
            })
        }
    }
    //choose new location logic
    const handleChooseLocation = (name, long, lat) => {
        setNewLocation({
            name,
            long,
            lat
        })
    }
    //abort choice logic 
    const handleAbortChoice = () => {
        setNewLocation(null)
    }
    //Show list logic
    const handleShowList = () => {
        setShowList(!showList)
        setShowFilters(false)
        setClickedLocation([])
    }
    //show events in the clicked location logic
    const handleMarkerClick = (coordinates, name) => {
        if (clickedLocation.length > 1) {
            setClickedLocation([])
        } else {
            setClickedLocation([coordinates[0], coordinates[1], name])
        }
        setShowFilters(false)
        setShowList(false)
    }
    return (
        <main id='events' className='events'>
            <div className='events-search'>
                <h1 id='hd-events' className='hd-lg' >Events</h1>
                {chooseLocation === true && !newLocation
                    ?
                    <p>
                        Please choose the event location from the list or by typing an address
                        <Geocoder handleChooseLocation={handleChooseLocation}
                            newLocation={newLocation}
                        />
                    </p>
                    :
                    (chooseLocation === true && newLocation)
                        ?
                        <div className=''>
                            <p>Chosen event location: {newLocation.name}</p>
                            <Button className='btn-lg' size='small' onClick={handleConfirmChoice}>Confirm and proceed
                                <ArrowForwardIosIcon />
                            </Button>
                            <Button onClick={handleAbortChoice}>
                                Choose another location
                                <ArrowBackIosIcon />
                            </Button>
                        </div>
                        :
                        <div className='events-btn'>
                            <Button className='btn-lg' size='small' onClick={createEvent}>
                                <AddBoxIcon />
                                Create Event
                            </Button>
                            <Button className='btn-lg' size='small' onClick={handleShowList}>
                                <KeyboardArrowDownIcon />
                                Show All Events
                            </Button>
                            <Button className='btn-lg' size='small' onClick={handleShowFilters}>
                                <KeyboardArrowDownIcon />
                                Show filters
                            </Button>
                        </div>
                }
                <div className={`filters ${!showFilters ? 'hide' : ''}`}><EventsFilters /></div>
            </div>

            {events.length === 0 ? <CircularProgress /> : (!showList && clickedLocation.length > 1) ?
                <div key={'123dfg'} className='events-ls' container alignItems='stretch' direction='row' spacing={3}>
                    <Button onClick={() => handleMarkerClick()} size='small'>
                        <CloseIcon />
                    </Button>
                    <h2>Events at {clickedLocation[2]}</h2>
                    {events.map((event => {
                        if (event.geometry.coordinates[0] === clickedLocation[0]) {
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
                        }
                    }))}
                </div>
                : showList &&
                <div key={'123ddgg'} className='events-ls' container alignItems='stretch' direction='row' spacing={3}>
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
                </div>
            }
            <div className='events-map'>
                <EventMap
                    events={events}
                    handleMarkerClick={handleMarkerClick}
                    newLocation={newLocation}
                />
            </div>
        </main>
    )
};



export default Events;


