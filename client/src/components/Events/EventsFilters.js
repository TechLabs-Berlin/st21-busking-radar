import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setStartDate, setEndDate, setTextFilter } from './../../actions/filters';

const EventsFilters = (props) => {
    const [showDatesFilters, setShowDatesFilters] = useState(false)
    const [startDate, chooseStartDate] = useState(new Date());
    const [endDate, chooseEndDate] = useState(null);
    const filters = useSelector((state) => state.filters)
    const dispatch = useDispatch();

    const handleTextInputChange = (e) => {
        dispatch(setTextFilter(e.target.value))
    }
    useEffect(() => {
        if (endDate < startDate) {
            setEndDate(startDate)
        }
        dispatch(setStartDate(startDate))
    }, [startDate])
    useEffect(() => {
        dispatch(setEndDate(endDate))
    }, [endDate])


    const handleShowDatesFilters = () => {
        setShowDatesFilters(!showDatesFilters)
    }
    return (
        <div className={`filters`}>
            <input className='input' type='text' value={filters.text} onChange={handleTextInputChange} placeholder='search event' />
            <button className='btn-md' onClick={handleShowDatesFilters}><span>This week</span><DateRangeIcon style={{ color: "rgba(164, 74, 63, 0.87)", width: "1rem", height: "1rem" }} /> </button>
            <div className={`filters-dates ${!showDatesFilters ? 'hide' : ''}`}>
                <label>Choose dates:</label>
                <p>Start date</p>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                        chooseStartDate(date)
                    }
                    }
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                />
                <p>End date</p>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => chooseEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    minDate={new Date()}
                />
            </div>
        </div>
    )
}

export default EventsFilters;