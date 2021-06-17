//SET_TEXT_FILTER

export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})


//setStartDate

export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

//setEndDate

export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})