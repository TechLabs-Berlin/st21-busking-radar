
const errorReducerDefaultState = {
    msg: {},
    status: null,
    id: null
}

const errorReducer = (state = errorReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_ERRORS':
            return {
                msg: action.errorData.msg,
                status: action.errorData.status,
                id: action.errorData.id
            };
        case 'CLEAR_ERRORS':
            return {
                msg: {},
                status: null,
                id: null
            };
        default:
            return state;
    }
}

export default errorReducer;