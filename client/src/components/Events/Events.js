import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGetAllEvents } from '../../actions/events';
import { Button } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Grid, CircularProgress } from '@material-ui/core';
import EventInfoCard from './EventInfoCard';
import moment from 'moment';
//polling mechanism

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
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startGetAllEvents())
    }, [])
    const events = useSelector((state) => state.events)
    return (
        <div>
            <main id='events' className='events'>
                <h1 id='hd-events' className='hd-lg' >Events</h1>
                <Button size='small' onClick={createEvent}>
                    <AddBoxIcon fontSize='small' />
                    Create Event
                </Button>
                {events.length === 0 ? <CircularProgress /> :
                    <Grid container alignItems='stretch' spacing={3}>
                        {events.map((event => {
                            return <Grid item xs={12} sm={6}>
                                <EventInfoCard
                                    id={event._id}
                                    key={event._id}
                                    name={event.name}
                                    genre={event.genre}
                                    location={event.location}
                                    date={moment(event.startTime).format('MMMM Do YYYY')}
                                    startTime={moment(event.startTime).format('h:mm:ss a')}
                                    endTime={moment(event.endTime).format('h:mm:ss a')}
                                    about={event.about}
                                    tags={event.tags}
                                    creator={event.creator}
                                    createdAt={moment(event.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                    active={event.active}
                                />
                            </Grid>
                        }))}
                    </Grid>
                }
            </main>
        </div>
    )
};

export default Events;