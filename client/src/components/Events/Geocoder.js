import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startSearchNewLocation } from '../../actions/geocoder';


const Geocoder = ({ handleChooseLocation, newLocation }) => {
    const [searchLocation, setSearchLocation] = useState('');
    const dispatch = useDispatch();

    //search location logic
    const handleSearchLocation = (e) => {
        setSearchLocation(e.target.value)
    }


    const sendReq = useCallback(() => {
        dispatch(startSearchNewLocation(searchLocation))
    })
    const suggestedLocations = useSelector((state) => state.suggestedLocations)
    return (
        <div className='geocoder'>
            <input type='text' value={searchLocation} name='search' onChange={handleSearchLocation} onKeyUp={sendReq} />
            <ul>
                {searchLocation !== '' && suggestedLocations.map(place => {
                    return <li onClick={() => { handleChooseLocation(place.place_name, place.geometry.coordinates[0], place.geometry.coordinates[1]) }}>{place.place_name}</li>
                })}
            </ul>
        </div>
    )
}

export default Geocoder;