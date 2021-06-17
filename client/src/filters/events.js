import moment from 'moment'

const selectEvents = (events, { text, startDate, endDate }) => {
    return events.filter(event => {
        const genreToMatch = event.genre.toLowerCase()
        const artistToMatch = event.creator.toLowerCase();
        const textMatch = genreToMatch.includes(text.toLowerCase()) || artistToMatch.includes(text.toLowerCase()) ? true : false;

        const endTime = moment(event.endTime)
        //dates pickers logic with moment methods are needed because the note.createdAt are not a number/unixtimestamp the anymore. 
        //The moment.js returns the moment instances. Therefore we need to use moment methods to compare moment instances or dates and not numbers like it was done before.
        //Here is an example how it was done before: const endDateMatch = typeof endDate !== 'number' || note.createdAt <= endDate;
        const startDateMatch = startDate ? moment(startDate).isSameOrBefore(endTime, 'day') : true;
        const endDateMatch = endDate ? moment(endDate).isSameOrAfter(endTime, 'day') : true;

        return textMatch && startDateMatch && endDateMatch
    }).sort((a, b) => {
        return a.endTime < b.endTime ? -1 : 1
    })
}

export default selectEvents;