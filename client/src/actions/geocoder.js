import axios from 'axios';

const searchNewLocation = (suggestedLocations) => {
    return {
        type: 'SEARCH_NEW_LOCATION',
        suggestedLocations
    }
}

//get the geolocation suggestion

export const startSearchNewLocation = (keyword = 'Berlin') => async (dispatch) => {
    try {
        const { data } = await axios.post('/api/geocoding', { query: keyword });
        dispatch(searchNewLocation(data))
    } catch (e) {
        console.log('this did not work', e.message);
    }
}

