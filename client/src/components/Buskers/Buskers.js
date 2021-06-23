import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGetUsers } from '../../actions/users';

const Buskers = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetUsers());
    }, [])

    const users = useSelector(state => state.users)
    console.log(users)
    return (
        <div>
        </div>
    )
}

export default Buskers;