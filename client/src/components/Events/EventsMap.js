import React, { useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
// import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Room } from '@material-ui/icons';


// using it this tutorials for building a map for events https://www.youtube.com/watch?v=9oEQvI7K-rA and https://www.youtube.com/watch?v=5pQsl9u_10M

const EventsMap = ({ events }) => {

    const [viewport, setViewport] = useState({
        // latitude: 52.5373,
        // longitude: 13.3603,
        latitude: 52.520008,
        longitude: 13.404954,
        width: '100%',
        height: '82vh',
        zoom: 11
    })
    const [newLocation, setNewLocation] = useState(null)
    const mapRef = useRef();
    const handleAddClick = (e) => {
        const [long, lat] = e.lngLat;
        setNewLocation({
            lat,
            long
        })
    }
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
        },
        []
    );
    const handleOnResult = (result) => {
        console.log(result)
        // setNewLocation({
        //     long,
        //     lat
        // })
    }

    return (
        <ReactMapGL
            ref={mapRef}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            {...viewport}
            mapStyle='mapbox://styles/mapbox/streets-v11'
            onViewportChange={handleViewportChange}
            onDblClick={handleAddClick}
        >
            {events.map(event => {
                return <Marker
                    key={event._id}
                    latitude={event.locationCoordinates[1]}
                    longitude={event.locationCoordinates[0]}
                >
                    <Room
                        style={{
                            fontSize: viewport.zoom * 3,
                            cursor: 'pointer',
                            //here we should have a color, if event is active, it should have a different color
                        }}
                    />
                </Marker>
            })}
            <Geocoder
                mapRef={mapRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                position="top-left"
                onResult={handleOnResult}
            />
            {newLocation && <Marker
                latitude={newLocation.lat}
                longitude={newLocation.long}
            >
                <Room
                    style={{
                        fontSize: viewport.zoom * 3,
                        cursor: 'pointer',
                        //here we should have a color, if event is active, it should have a different color
                    }}
                />
            </Marker>}
        </ReactMapGL>
    )
}

export default EventsMap

//     < Marker >
//     Here the location and pin
// </Marker >
//     <Popup>
//         Here the info about the event
// </Popup>

