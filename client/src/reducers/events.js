
const eventsReducerDefaultState = [];

const eventsReducer = (state = eventsReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_ALL_EVENTS':
            return action.payload;
        case 'CREATE_EVENT':
            return [...state, action.eventData];
        case 'UPDATE_EVENT':
            return state.map(event => {
                if (event._id === action.updates._id) {
                    return action.updates
                } else {
                    return event
                }
            });
        default:
            return state;
    }
};

export default eventsReducer;