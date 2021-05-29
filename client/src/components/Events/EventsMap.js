import React, { useState, useCallback, useRef } from 'react';
// import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';


// using it this tutorials for building a map for events https://www.youtube.com/watch?v=9oEQvI7K-rA and https://www.youtube.com/watch?v=5pQsl9u_10M

const EventsMap = (props) => {
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
    console.log()
    const handleAddClick = (e) => {
        console.log(e)
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
    return (
        <ReactMapGL
            ref={mapRef}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            {...viewport}
            mapStyle='mapbox://styles/mapbox/streets-v11'
            onViewportChange={handleViewportChange}
            onDblClick={handleAddClick}
        >
            <Geocoder
                mapRef={mapRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                position="top-left"
                marker
            />

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

// const EventsMap = () => {
//     return (
//         <GoogleMap defaultZoom={10} defaultCenter={{ lat: 52.520008, lng: 13.404954 }} />
//     )
// }
// const WrappedMap = withScriptjs(withGoogleMap(EventsMap));

// export default WrappedMap