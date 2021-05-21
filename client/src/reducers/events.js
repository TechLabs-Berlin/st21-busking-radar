
const eventsReducerDefaultState = [];

const eventsReducer = (state = eventsReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_ALL_EVENTS':
            return action.payload;
        case 'CREATE_EVENT':
            return state;
        default:
            return state;
    }
};

export default eventsReducer;