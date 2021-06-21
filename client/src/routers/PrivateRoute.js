import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    return (
        <Route {...rest} component={(props) => {
            return isAuthenticated === true ? <Component {...props} /> : (<Redirect to={{
                pathname: '/login',
                //I could use it for saving redirecting user to the same location
                //where the user tried to do the action being unauthenticated 
                //for example busker clicked the create event without being login,
                //then he is redirected to the login page, after he logged in he can be redirected back to create event, 
                //but with the geolocation already opened.
                state: { from: props.location }
            }} />)
        }} />
    )
}

export default PrivateRoute
