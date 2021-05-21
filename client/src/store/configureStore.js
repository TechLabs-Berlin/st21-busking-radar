import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
//import middleware
import thunk from 'redux-thunk';
//import-reducers
import eventsReducer from '../reducers/events';
// import filtersReducer from '../reducers/filters';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const configureStore = () => {
    const store = createStore(combineReducers({
        events: eventsReducer,
    }),
        compose(
            composeEnhancers(applyMiddleware(thunk)),
        )

    );
    return store
};

export default configureStore;