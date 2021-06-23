import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
//import middleware
import thunk from 'redux-thunk';
//import-reducers
import eventsReducer from '../reducers/events';
import filtersReducer from '../reducers/filters';
import geocoderReducer from '../reducers/geocoder';
import authReducer from '../reducers/auth';
import errorReducer from '../reducers/error';
import usersReducer from '../reducers/users';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const configureStore = () => {
    const store = createStore(combineReducers({
        events: eventsReducer,
        filters: filtersReducer,
        suggestedLocations: geocoderReducer,
        auth: authReducer,
        error: errorReducer,
        users: usersReducer
    }),
        compose(
            composeEnhancers(applyMiddleware(thunk)),
        )

    );
    return store
};

export default configureStore;