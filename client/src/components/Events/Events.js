import React, { useState, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { startGetAllEvents, startUpdateEvent } from '../../actions/events';
import CloseIcon from '@material-ui/icons/Close';
import EventInfoCard from './EventInfoCard';
import EventMap from './EventMap';
import Geocoder from './Geocoder';
import EventsFilters from './EventsFilters';
import selectEvents from './../../filters/events';





//polling mechanism
const Events = ({ history }) => {
    const [showList, setShowList] = useState(false)
    const [newLocation, setNewLocation] = useState(null)
    const [chooseLocation, setChooseLocation] = useState(false)
    const [clickedLocation, setClickedLocation] = useState([]);
    const [intervalMs, setIntervalMs] = useState(2000)
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
        setShowList(false)
        setClickedLocation([])
    }
    //Handlers
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
        setClickedLocation([])
    }
    //show events in the clicked location logic
    const handleMarkerClick = (coordinates, name) => {
        if (clickedLocation.length > 1) {
            setClickedLocation([])
        } else {
            setClickedLocation([coordinates[0], coordinates[1], name])
        }
        setShowList(false)
    }
    //initiallizing events filters

    return (
        <main id='events' className='events'>
            <div className='logo logo-events'></div>
            <Geocoder
                handleChooseLocation={handleChooseLocation}
                newLocation={newLocation}
                handleAbortChoice={handleAbortChoice}
            />
            {chooseLocation === true && !newLocation
                ?
                <p className='text-sub text-choose'>
                    Please choose the event location by typing an address
                </p>
                :
                (chooseLocation === true && newLocation)
                    ?
                    <div className='choice-container'>
                        <p className='text-sub text-choose'>Chosen location: <span>"{newLocation.name}"</span> </p>
                        <button className='btn-lg' size='small' onClick={handleConfirmChoice}>
                            Confirm choice
                        </button>
                        <button className='btn-lg' onClick={handleAbortChoice}>
                            Cancel
                        </button>
                    </div>
                    :
                    <div className='events-btn'>
                        <button className='btn-lg' size='small' onClick={createEvent}>
                            Create Event
                        </button>
                    </div>
            }
            <button className='btn-lg btn-see' size='small' onClick={handleShowList}>
                See All Events
            </button>
            {events.length === 0 ? <h2 className='hd-md'>No events are scheduled for this day</h2> : (!showList && clickedLocation.length > 1) ?
                <div key={'123dfg'} className='events-ls' >
                    <button className='btn-close' onClick={() => handleMarkerClick()} size='small'>
                        <CloseIcon fontSize='large' style={{ color: "rgba(164, 74, 63, 0.87)", backgroundColor: "white" }} />
                    </button>
                    <h2 className='hd-md'>Events at {clickedLocation[2]}</h2>
                    {events.map((event => {
                        if (event.geometry.coordinates[0] === clickedLocation[0]) {
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
                        }
                    }))}
                </div>
                : showList &&
                <div key={'123ddgg'} className='events-ls' >
                    <button className='btn-close' onClick={handleShowList} >
                        <CloseIcon fontSize='large' style={{ color: "rgba(164, 74, 63, 0.87)", backgroundColor: "white" }} />
                    </button>
                    <h2 className='hd-md'>Events</h2>
                    <EventsFilters />
                    {events.map((event => {
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
                            createdAt={moment(event.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                            active={event.active}
                        />
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


