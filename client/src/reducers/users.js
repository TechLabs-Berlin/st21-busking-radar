const usersReducerDefaultState = [];

const usersReducer = (state = usersReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return action.payload;
        default:
            return state;
    }
};

export default usersReducer;