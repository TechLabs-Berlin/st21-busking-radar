import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickerUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import EventForm from './EventForm';


const Event = () => {

    return (
        <div>
            <main id='create-event' className='create-event'>
                <h1 id='hd-create-event' className='hd-lg'>Create Event</h1>
                <EventForm />
            </main>
        </div>
    )
}

export default Event;