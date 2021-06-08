import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setStartDate, setEndDate, setTextFilter } from './../../actions/filters';

const EventsFilters = (props) => {
    // const [dateRange, setDateRange] = useState([null, null]);
    // const [startDate, endDate] = dateRange;
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

    return (
        <div className='filters'>
            <p>Search by genre or artist name</p>
            <input type='text' value={filters.text} onChange={handleTextInputChange} />
            <p>Filter by dates</p>
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
    )
}

export default EventsFilters;