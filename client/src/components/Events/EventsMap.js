import React, { useState, useCallback, useRef, createRef } from 'react';
import moment from 'moment';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "mapbox-gl/dist/mapbox-gl.css";
import { Room } from '@material-ui/icons';
import { Button, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EventInfoCard from './EventInfoCard';


// using it this tutorials for building a map for events https://www.youtube.com/watch?v=9oEQvI7K-rA and https://www.youtube.com/watch?v=5pQsl9u_10M

const EventsMap = ({ events, handleAddClick, newLocation, handleOnResult, chooseLocation }) => {
    //referring to the geocoder container outside of the map
    let geocoderContainerRef = createRef();


    //show popup with event info logic
    //here we are setting id, if Id is set and it is the same as the marker's id,
    //the popup with event info is displayed
    const [currentLocationCoordinates, setCurrentLocationCoordinates] = useState(null);
    const handleMarkerClick = (locationCoordinates) => {
        setCurrentLocationCoordinates(locationCoordinates)
    }
    //setting the map with geocoder
    const [viewport, setViewport] = useState({
        // latitude: 52.5373,
        // longitude: 13.3603,
        latitude: 52.520008,
        longitude: 13.404954,
        width: '100%',
        height: '82vh',
        zoom: 11
    })
    //this is needed in order to adjust the pin so it would resize and stay on the same spot when zooming on the map
    let size = 40;

    const mapRef = useRef();
    const handleViewportChange = useCallback((viewport) =>
        setViewport(viewport), [])
    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 };
            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            });
        }, []);
    return (
        <div className='events-map'>
            <div
                ref={geocoderContainerRef}
                className='map-geocoder'
            />
            {currentLocationCoordinates && <div className='events-ls' key={'selected-events-list'}>
                <h2>Events at {events.map(event => {
                    if (event.locationCoordinates[0] === currentLocationCoordinates[0] && event.locationCoordinates[1] === currentLocationCoordinates[1]) {
                        return event.locationName.split(' ').splice(0, 2).join(' ')
                    }
                })}</h2>
                {events.map(event => {
                    if (event.locationCoordinates[0] === currentLocationCoordinates[0] && event.locationCoordinates[1] === currentLocationCoordinates[1])
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
                })}
                <Button onClick={() => setCurrentLocationCoordinates(null)} size='small'>
                    <CloseIcon />
                </Button>
            </div>
            }
            <div className='map'>
                <ReactMapGL
                    ref={mapRef}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    {...viewport}
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                    onViewportChange={handleViewportChange}
                    onDblClick={handleAddClick}
                >
                    {events.map(event => {
                        return <div key={event._id} className='marker-pin-container'>
                            <Marker
                                key={event._id}
                                latitude={event.locationCoordinates[1]}
                                longitude={event.locationCoordinates[0]}
                            >

                                <Room
                                    key={event._id + event.name}
                                    style={{
                                        transform: `translate(${-size / 2}px,${-size}px)`,
                                        fontSize: viewport.zoom * 3,
                                        cursor: 'pointer',
                                        zIndex: -100
                                        //here we should have a color, if event is active, it should have a different color
                                    }}
                                    onClick={() => handleMarkerClick(event.locationCoordinates)}
                                />
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
                                    fontSize: viewport.zoom * 3,
                                    cursor: 'pointer',
                                    //here we should have a color, if event is active, it should have a different color
                                }}
                            />
                        </Marker>
                        :
                        ''
                    }
                    <Geocoder
                        mapRef={mapRef}
                        containerRef={geocoderContainerRef}
                        onViewportChange={handleGeocoderViewportChange}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        onResult={handleOnResult}
                        proximity={{
                            latitude: 52.520008,
                            longitude: 13.404954
                        }}
                        clearOnBlue={true}
                        reverseGeocode={true}
                        inputValue={
                            newLocation && `${newLocation.locationCoordinates[1]}, ${newLocation.locationCoordinates[0]}`
                        }
                    />
                </ReactMapGL>
            </div>
        </div >
    )
}

export default EventsMap;


