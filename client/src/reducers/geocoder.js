const geocoderReducerDefaultState = [];

const geocoderReducer = (state = geocoderReducerDefaultState, action) => {
    switch (action.type) {
        case 'SEARCH_NEW_LOCATION':
            return action.suggestedLocations;
        default:
            return state;
    }
};

export default geocoderReducer;