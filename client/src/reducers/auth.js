
const authDefaultState = {
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    isLoading: false,
}

const authReducer = (state = authDefaultState, action) => {
    switch (action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                isLoading: true
            };
        case 'USER_LOADED':
            const user = JSON.stringify(action.payload)
            localStorage.setItem("user", user)
            console.log(user)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case 'AUTH_WITH_GOOGLE':
            localStorage.setItem('token', action?.data.token)
            return {
                ...state,
                userData: action?.data.result,
                isAuthenticated: true,
                token: action.data.token
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            // const token = JSON.stringify(action.userData.token)
            // localStorage.setItem("token", token)
            return {
                ...state,
                ...action.userData,
                isAuthenticated: true,
                isLoading: false
            };
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT_SUCCESS':
        case 'REGISTER_FAIL':
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                userData: null,
                isAuthenticated: false,
                isLoading: false,
                token: null
            };
        // case 'UPDATE_USER_INFO':
        //     const newInfo = JSON.stringify({ ...state.user, ...action.updates })
        //     console.log(newInfo)
        //     localStorage.setItem("user", newInfo)
        //     return {
        //         ...state,
        //         isAuthenticated: true,
        //         isLoading: false
        //     }
        default:
            return state
    }
}

export default authReducer