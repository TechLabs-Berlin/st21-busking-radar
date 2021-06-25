import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { startGetAllEvents } from '../../actions/events';
import BuskerInfoCard from './BuskerInfoCard';
import BuskerPage from './BuskerPage';

const Buskers = ({ history }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetAllEvents())
    }, [])

    const users = useSelector(state => state.users)
    return (
        <div className='buskers-list'>
            {users.map(user => {
                return <BuskerInfoCard
                    name={user.name}
                    socialLinks={user.socialLinks}
                    genre={user.genre}
                    about={user.about}
                    profilePic={user.profilePic}
                    history={history}
                    id={user._id}
                />
            })}
            <Route exact path='/busker/:id' component={BuskerPage} />
        </div>
    )
}

export default Buskers;