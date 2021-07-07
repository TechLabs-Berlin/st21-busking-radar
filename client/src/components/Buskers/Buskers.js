import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGetAllEvents } from '../../actions/events';
import { startGetUsers } from '../../actions/users';
import BuskerInfoCard from './BuskerInfoCard';

const Buskers = ({ history }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetAllEvents())
    }, [dispatch])
    useLayoutEffect(() => {
        dispatch(startGetUsers());
    }, [dispatch])
    const users = useSelector(state => state.users)
    return (
        <main className='buskers-page'>
            <div className='logo logo-buskers'></div>
            <h1 className='hd-lg'>Berlin Buskers</h1>
            <div className='buskers-list'>
                {users.map(user => {
                    return <BuskerInfoCard
                        key={user._id + user.name}
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
        </main>
    )
}

export default Buskers;

