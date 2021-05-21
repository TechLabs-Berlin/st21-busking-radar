import React from 'react';
import EventInfoCard from './EventInfoCard';
import { useSelector } from 'react-redux';
import { startGetAllEvents } from '../../actions/events';


const Events = ({ history }) => {
    //supporting hooks 
    //useDispatch is a new hook that replaced mapDispatchToProps. The Question, however, is how can we write a 
    //test for it. Is it possible? Check it out later for sure!!!)
    // const dispatch = useDispatch();
    //Navigation
    const createEvent = () => {
        history.push('/events/create')
    }

    //fetching events
    //useSelector here is a new hook, which replaces the mapStateToProps middleware
    const events = useSelector((state) => state.events)
    console.log(events)
    return (
        <div>
            <main id='events' className='events'>
                <h1 id='hd-events' className='hd-lg' >Events</h1>
                <button onClick={createEvent}>Create Event</button>
                <EventInfoCard />
                <EventInfoCard />
            </main>
        </div>
    )
};

export default Events;