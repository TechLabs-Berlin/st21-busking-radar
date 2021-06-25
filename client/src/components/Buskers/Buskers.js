import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGetUsers } from '../../actions/users';
import BuskerInfoCard from './BuskerInfoCard';

const Buskers = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetUsers());
    }, [])

    const users = useSelector(state => state.users)
    console.log(users)
    return (
        <div className='buskers-list'>
            {users.map(user => {
                return <BuskerInfoCard
                    name={user.name}
                    socialLinks={user.socialLinks}
                    genre={user.genre}
                    about={user.about}
                    profilePic={user.profilePic}
                />
            })}
        </div>
    )
}

export default Buskers;