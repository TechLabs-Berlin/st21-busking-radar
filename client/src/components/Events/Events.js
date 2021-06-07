import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { startGetAllEvents } from '../../actions/events';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Grid, CircularProgress, Button } from '@material-ui/core';
import EventInfoCard from './EventInfoCard';
import EventsMap from './EventsMap';

//polling mechanism



const Events = ({ history }) => {
    const [currentLocationCoordinates, setCurrentLocationCoordinates] = useState(null);
    const [showList, setShowList] = useState(false)
    const [newLocation, setNewLocation] = useState(null)
    const [chooseLocation, setChooseLocation] = useState(false)
    //supporting hooks 
    //useDispatch is a new hook that replaced mapDispatchToProps. The Question, however, is how can we write a 
    //test for it. Is it possible? Check it out later for sure!!!)
    //useSelector here is a new hook, which replaces the mapStateToProps middleware
    //Fetching events!!!
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startGetAllEvents())
    }, [])
    const events = useSelector((state) => state.events)


    //Handlers
    //Show list logic
    const handleShowList = () => {
        setShowList(!showList)
    }

    //Map logic, choose location by clicking
    const handleAddClick = (e) => {
        const [long, lat] = e.lngLat;
        setNewLocation({
            locationCoordinates: [long, lat],
            locationName: ''
        })
    }
    //getting the geolocation of the place logic
    const handleOnResult = (result) => {
        console.log(result)
        setNewLocation({
            locationCoordinates: [result.result.center[0], result.result.center[1]],
            locationName: result.result.place_name
        })
    }

    //choose location logic
    const handleChooseLocation = () => {
        setChooseLocation(!chooseLocation)
        setCurrentLocationCoordinates(null)
        setShowList(false)
    }
    //Navigation to create event page and passing the chosen location
    const createEvent = () => {
        if (newLocation) {
            history.push({
                pathname: `/events/create`,
                search: `?locationName=${newLocation.locationName}&longitude=${newLocation.locationCoordinates[0]}&latitude=${newLocation.locationCoordinates[1]}`,
            })
        }
    }

    //show popup with event info logic
    //here we are setting id, if Id is set and it is the same as the marker's id,
    //the popup with event info is displayed
    const handleMarkerClick = (locationCoordinates) => {
        if (!chooseLocation)
            setCurrentLocationCoordinates(locationCoordinates)
    }
    return (
        <main id='events' className='events'>
            <div className='events-top'>
                <h1 id='hd-events' className='hd-lg' >Events</h1>
                {chooseLocation === true && !newLocation ? <p>Please choose the event location from the list or by clicking on the map</p>
                    :
                    (chooseLocation === true && newLocation) ?
                        <div className=''>
                            <p>Choose this location and proceed to create event</p>
                            <Button className='btn-lg' size='small' onClick={createEvent}>Yes
                            <ArrowForwardIosIcon />
                            </Button>
                        </div>
                        :
                        <div className='events-btn'>
                            <Button className='btn-lg' size='small' onClick={handleChooseLocation}>
                                <AddBoxIcon />
                        Create Event
                    </Button>
                            <Button className='btn-lg' size='small' onClick={handleShowList}>
                                <KeyboardArrowDownIcon />
                        Show All Events
                    </Button>
                        </div>
                }
            </div>
            {
                events.length === 0 ? <CircularProgress /> : showList &&
                    <div key={'123dfg'} className='events-ls' container alignItems='stretch' direction='row' spacing={3}>
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
                <EventsMap
                    handleAddClick={handleAddClick}
                    newLocation={newLocation}
                    events={events}
                    handleOnResult={handleOnResult}
                    chooseLocation={chooseLocation}
                    handleMarkerClick={handleMarkerClick}
                    currentLocationCoordinates={currentLocationCoordinates}
                />
            </div>
        </main >
    )
};



export default Events;

