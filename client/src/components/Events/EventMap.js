import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


const EventMap = ({
    handleMarkerClick,
    newLocation,
    events
}) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(13.404954);
    const [lat, setLat] = useState(52.520008);
    const [zoom, setZoom] = useState(11);
    const prevNewLocation = useRef(null)
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    useEffect(() => {
        // if (map.current) return;   //for some reason this method does not delete all markers. Therefore the map has to be rerendered check down there
        // map render only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

    }, [events.length])


    useEffect(() => {
        let eventsIds = []
        events.forEach(event => {
            eventsIds.push(event._id)
            let eventsNumber = 0;
            for (let i = 0; i < events.length; i++) {
                if (events[i].geometry.coordinates[0] === event.geometry.coordinates[0]) {
                    eventsNumber++
                }
            }

            let customMarker = document.createElement('div');
            customMarker.id = `${event._id}`
            customMarker.className = 'marker';
            customMarker.addEventListener('click', () => {
                handleMarkerClick(event.geometry.coordinates, event.locationName)
                map.current.flyTo({
                    center: event.geometry.coordinates,
                    zoom: 13.5
                });

            })
            // eventsIds.push(event._id)
            customMarker.innerHTML = `<span><b>${eventsNumber}</b></span>`
            let marker = new mapboxgl.Marker(customMarker)
                .setLngLat(event.geometry.coordinates)
                .addTo(map.current)
            return marker
        })
        //for some reason this method does not delete all markers. This has to be solved later
        map.current._markers.forEach(marker => {
            if (eventsIds.includes(marker._element.id) === false) {
                marker.remove()
            }
        })

    }, [events.length])
    useEffect(() => {
        if (newLocation) {
            prevNewLocation.current = newLocation
            let newCostumMarker = document.createElement('div');
            newCostumMarker.id = newLocation.id
            newCostumMarker.className = 'marker';
            newCostumMarker.className = 'newMarker';
            newCostumMarker.innerHTML = `<span></span>`
            const newMarker = new mapboxgl.Marker(newCostumMarker)
                .setLngLat([newLocation.long, newLocation.lat])
                .addTo(map.current)
            map.current.flyTo({
                center: [newLocation.long, newLocation.lat],
                zoom: 13.5
            });
            return newMarker
        } else if (prevNewLocation.current) {
            //this deletes the chosen new location if the choice is aborted
            map.current._markers.forEach(marker => {
                if (marker._element.id === prevNewLocation.current.id) {
                    return marker.remove()
                }
            })
        }
    }, [newLocation])
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    }, []);
    return (
        <div id='events-map' className='events-map'>
            <div id='map-container' ref={mapContainer} className='map-container' />
        </div>
    )
}

export default EventMap;

