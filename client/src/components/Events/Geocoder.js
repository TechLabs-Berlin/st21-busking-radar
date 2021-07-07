import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startSearchNewLocation } from '../../actions/geocoder';


const Geocoder = ({ handleChooseLocation, handleAbortChoice }) => {
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
        <div className='geocoder' key='e456geocoder'>
            <i class="fas fa-search icon"></i>
            <input className='input' type='text' value={searchLocation} name='search' onChange={handleSearchLocation} onKeyUp={sendReq} placeholder='Search location' />
            <ul className='ls-result'>
                {searchLocation !== '' && suggestedLocations.map(place => {
                    return <li className='item-result' onClick={async () => {
                        await handleAbortChoice()
                        handleChooseLocation(place.place_name, place.geometry.coordinates[0], place.geometry.coordinates[1], place.place_name + place.geometry.coordinates[0])
                        setSearchLocation('')
                    }}>{place.place_name}</li>
                })}
            </ul>
        </div>
    )
}

export default Geocoder;