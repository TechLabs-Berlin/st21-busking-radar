import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


const EventMap = ({ events,
    handleMarkerClick,
    newLocation
}) => {
    const mapContainer = useRef(null);
    const map = useRef(null)
    const [lng, setLng] = useState(13.404954);
    const [lat, setLat] = useState(52.520008);
    const [zoom, setZoom] = useState(11);
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    let size = 40;
    useEffect(() => {
        if (map.current) return;
        // map render only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 11
        });
    }, [])
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });
    useEffect(() => {
        events.map(event => {
            let eventsNumber = 0;
            for (let i = 0; i < events.length; i++) {
                if (events[i].geometry.coordinates[0] === event.geometry.coordinates[0]) {
                    eventsNumber++
                }
            }
            // const customMarker = document.createElement('i')
            // // const costumMarker = document.createElement('span')
            // customMarker.className = 'fas fa-map-marker fa-4x';
            // customMarker.addEventListener('click', () => {
            //     handleMarkerClick(event.geometry.coordinates)
            // })
            // customMarker.className = 'fa-stack fa-2x';
            // customMarker.innerHTML = '<i class="fas fa-map-marker fa-stack-2x event-pin"></i> <strong class="fa-stack-2x text-primary events-number"> 1</strong>'
            let marker = new mapboxgl.Marker()
                .setLngLat(event.geometry.coordinates)
                .addTo(map.current)
            marker.getElement().addEventListener('click', () => {
                handleMarkerClick(event.geometry.coordinates)
            })
            return marker
        })
    })
    useEffect(() => {
        if (newLocation) {
            const newMarker = new mapboxgl.Marker()
                .setLngLat([newLocation.long, newLocation.lat])
                .addTo(map.current)
            newMarker.getElement().style.backgroundColor = 'red'
            newMarker.getElement().style.content = '2'
            return newMarker
        }
    }, newLocation)
    return (
        <div id='events-map' className='events-map'>
            <div id='map-container' ref={mapContainer} className='map-container' />
        </div>
    )
}

export default EventMap;

