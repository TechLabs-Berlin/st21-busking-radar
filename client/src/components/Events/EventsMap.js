import React, { useState, useCallback, useRef, useEffect, createRef } from 'react';
import moment from 'moment';
import MapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "mapbox-gl/dist/mapbox-gl.css";
import { Room } from '@material-ui/icons';
import { Button, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EventInfoCard from './EventInfoCard';


// using it this tutorials for building a map for events https://www.youtube.com/watch?v=9oEQvI7K-rA and https://www.youtube.com/watch?v=5pQsl9u_10M

const EventsMap = ({ events,
    handleAddClick,
    newLocation,
    handleOnResult,
    chooseLocation,
    handleMarkerClick,
    currentLocationCoordinates
}) => {
    //referring to the geocoder container outside of the map
    let geocoderContainerRef = useRef();
    const mapRef = useRef();
    //setting the map with geocoder
    const [viewport, setViewport] = useState({
        latitude: 52.520008,
        longitude: 13.404954,
        width: '100vw',
        height: '100vh',
        zoom: 11
    })
    //this is needed in order to adjust the pin so it would resize and stay on the same spot when zooming on the map
    const size = 40;

    const handleViewportChange = useCallback((viewport) => {
        setViewport(viewport)
    }, [])
    //It has a bug, and I can not fix it. I am moving forward now, comeback later.
    //when click on the same location in the after suggestion twice, the map crashes
    // const handleGeocoderViewportChange = useCallback(
    //     (newViewport) => {
    //         const geocoderDefaultOverrides = { transitionDuration: 500 };
    //         setViewport({
    //             ...newViewport,
    //             ...geocoderDefaultOverrides
    //         });
    //     }, [])
    return (
        <div className='events-map'>
            {chooseLocation && <div
                ref={geocoderContainerRef}
                className='map-geocoder'
            />}
            {currentLocationCoordinates && <div className='events-ls' key='selected-events123'>

                {events.map(event => {
                    if (event.locationCoordinates[0] === currentLocationCoordinates[0] && event.locationCoordinates[1] === currentLocationCoordinates[1])
                        return <Grid item xs={10} sm={8}>
                            <EventInfoCard
                                id={event._id}
                                key={event._id + event.creator}
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
                })}
                <Button onClick={() => handleMarkerClick(null)} size='small'>
                    <CloseIcon />
                </Button>
            </div>
            }
            <div className='map'>
                <MapGL
                    {...viewport}
                    ref={mapRef}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                    onViewportChange={handleViewportChange}
                    onDblClick={handleAddClick}
                >
                    {events.map(event => {
                        let eventsNumber = 0;
                        for (let i = 0; i < events.length; i++) {
                            if (events[i].locationCoordinates[0] === event.locationCoordinates[0]) {
                                eventsNumber++
                            }
                        }
                        return <div key={event._id + event.locationName} className='marker-pin-container'>
                            <Marker
                                key={event._id + event.locationCoordinates[0]}
                                latitude={event.locationCoordinates[1]}
                                longitude={event.locationCoordinates[0]}
                            >
                                <span class='fa-stack fa-2x'
                                    onClick={() => handleMarkerClick(event.locationCoordinates)}>
                                    <i class="fas fa-map-marker fa-stack-2x event-pin"
                                        key={event._id + event.name}
                                        style={{
                                            transform: `translate(${-size / 1}px,${-size}px)`,
                                            fontSize: viewport.zoom * 3,
                                            cursor: 'pointer',
                                            zIndex: -100
                                            //here we should have a color, if event is active, it should have a different color
                                        }}
                                        onClick={() => handleMarkerClick(event.locationCoordinates)}></i>
                                    <strong
                                        key={event._id + event.locationCoordinates[1]}
                                        style={{
                                            transform: `translate(${-size / 1}px,${-size}px)`,
                                            fontSize: viewport.zoom * 3,
                                            cursor: 'pointer',
                                            zIndex: -100
                                            //here we should have a color, if event is active, it should have a different color
                                        }}
                                        className="fa-stack-2x text-primary events-number" style={{
                                            transform: `translate(${-size / 1}px,${-size}px)`,
                                            fontSize: viewport.zoom * 3,
                                            cursor: 'pointer',
                                            zIndex: -100,
                                            fontSize: '0.7em'
                                            //here we should have a color, if event is active, it should have a different color
                                        }}>{eventsNumber > 1 && eventsNumber}</strong>
                                </span>
                            </Marker>
                        </div>
                    })}

                    {newLocation && chooseLocation
                        ? <Marker
                            latitude={newLocation.locationCoordinates[1]}
                            longitude={newLocation.locationCoordinates[0]}
                        >
                            <Room
                                style={{
                                    transform: `translate(${-size / 2}px,${-size}px)`,
                                    fontSize: viewport.zoom * 3,
                                    cursor: 'pointer',
                                    color: 'red'
                                    //     here we should have a color, if event is active, it should have a different color
                                }}
                            />

                        </Marker>
                        :
                        ''
                    }
                    {chooseLocation && <Geocoder
                        mapRef={mapRef}
                        containerRef={geocoderContainerRef}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        onResult={handleOnResult}
                        proximity={{
                            latitude: 52.520008,
                            longitude: 13.404954,
                        }}
                        // onViewportChange={handleViewportChange}//<-this makes bug, should try to solve it later
                        clearOnBlue={true}
                        reverseGeocode={true}
                        inputValue={
                            newLocation && `${newLocation.locationCoordinates[1]}, ${newLocation.locationCoordinates[0]}`
                        }
                    />}
                </MapGL>
            </div >
        </div >
    )
}

export default EventsMap;


<EventsMap
    handleAddClick={handleAddClick}
    newLocation={newLocation}
    events={events}
    handleOnResult={handleOnResult}
    chooseLocation={chooseLocation}
    handleMarkerClick={handleMarkerClick}
    currentLocationCoordinates={currentLocationCoordinates}
/>


//buttons logic from the old mapbox
{
    chooseLocation === true && !newLocation ? <p>Please choose the event location from the list or by clicking on the map</p>
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
                <Button className='btn-lg' size='small' onClick={handleShowFilters}>
                    <KeyboardArrowDownIcon />
                                Show filters
                            </Button>
            </div>
}



