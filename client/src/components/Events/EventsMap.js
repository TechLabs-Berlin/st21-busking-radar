import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

const EventsMap = () => {
    return (
        <GoogleMap defaultZoom={10} defaultCenter={{ lat: 52.520008, lng: 13.404954 }} />
    )
}
const WrappedMap = withScriptjs(withGoogleMap(EventsMap));

export default WrappedMap