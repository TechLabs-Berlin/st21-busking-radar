import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGetAllEvents } from '../../actions/events';
import { startGetUsers } from '../../actions/users';
import BuskerInfoCard from './BuskerInfoCard';

const Buskers = ({ history }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetAllEvents())
    }, [])
    useEffect(() => {
        dispatch(startGetUsers());
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
        </div>
    )
}

export default Buskers;

