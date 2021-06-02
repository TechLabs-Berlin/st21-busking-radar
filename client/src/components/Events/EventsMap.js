import React, { useState, useCallback, useRef, createRef } from 'react';
import moment from 'moment';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "mapbox-gl/dist/mapbox-gl.css";
import { Room } from '@material-ui/icons';


// using it this tutorials for building a map for events https://www.youtube.com/watch?v=9oEQvI7K-rA and https://www.youtube.com/watch?v=5pQsl9u_10M

const EventsMap = ({ events, handleAddClick, newLocation, handleOnResult, chooseLocation }) => {
    //referring to the geocoder container outside of the map
    let geocoderContainerRef = createRef();

    //show popup with event info logic
    //here we are setting id, if Id is set and it is the same as the marker's id,
    //the popup with event info is displayed
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const handleMarkerClick = (id) => {
        setCurrentPlaceId(id)
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
                        return <div>
                            <Marker
                                key={event._id}
                                latitude={event.locationCoordinates[1]}
                                longitude={event.locationCoordinates[0]}
                            >
                                <Room
                                    style={{
                                        fontSize: viewport.zoom * 3,
                                        cursor: 'pointer',
                                        zIndex: -100
                                        //here we should have a color, if event is active, it should have a different color
                                    }}
                                    onClick={() => handleMarkerClick(event._id)}
                                />
                            </Marker>
                            {event._id === currentPlaceId && <Popup
                                key={event._id + event.name}
                                latitude={event.locationCoordinates[1]}
                                longitude={event.locationCoordinates[0]}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => setCurrentPlaceId(null)}
                                anchor='left'
                                className='event-popup'
                            >
                                <div className='event-popup'>
                                    <h3>{event.name}</h3>
                                    <p>{event.creator}</p>
                                    <p>{event.location}</p>
                                    <p>Date:{moment(event.startTime).format('MMMM Do YYYY')}</p>
                                    <p>Starts: {moment(event.startTime).format('h:mm:ss a')}</p>
                                    <p>Ends: {moment(event.endTime).format('h:mm:ss a')}</p>
                                </div>
                            </Popup>
                            }
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
                    />
                </ReactMapGL>
            </div>
        </div>
    )
}

export default EventsMap;