import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Geocoder from 'react-mapbox-gl-geocoder'

const EventMap = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(13.404954);
    const [lat, setLat] = useState(52.520008);
    const [zoom, setZoom] = useState(11);
    // const [viewport, setViewport] = useState({ viewport: {} });
    // const queryParams = {
    //     proximity: {
    //         longitude: 13.404954,
    //         latitude: 52.520008
    //     }
    // }
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    // const mapAccess = {
    //     mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_TOKEN
    // }

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    })
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });
    // const handleSelectedItem = (viewport, item) => {
    //     setViewport({ viewport });
    //     console.log(item)
    // }

    // useEffect(() => {
    //     const geocoder = new MapboxGeocoder({ // Initialize the geocoder
    //         accessToken: mapboxgl.accessToken, // Set the access token
    //         mapboxgl: mapboxgl, // Set the mapbox-gl instance
    //         marker: false, // Do not use the default marker style
    //         placeholder: 'Search for places in Berlin', // Placeholder text for the search bar
    //         proximity: {
    //             longitude: 13.404954,
    //             latitude: 13.404954
    //         } // Coordinates of UC Berkeley
    //     });
    //     map.current.addControl(geocoder)
    // }, []
    // );

    return (
        <div id='events-map' className='events-map'>
            <div ref={mapContainer} className='map-container' />
        </div>
    )
}

export default EventMap;

// <Geocoder
//                 {...mapAccess}
//                 onSelected={handleSelectedItem}
//                 updateInputOnSelect={true}
//                 queryParams={queryParams}
//                 localGeocoder={() => { '?localResults=13.404954&latitude=${newLocation.locationCoordinates[1]}' }}
//             />