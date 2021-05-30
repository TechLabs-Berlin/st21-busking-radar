const mongoose = require('mongoose');
const Event = require('./models/event.js');

const CONNECTION_URL = 'mongodb+srv://Basan:HeyBuskers@cluster0.17vvk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('database connected')
}).catch((e) => {
    console.log('This did not work', e.message)
})
//Here is some mockData for events

const mockEvent = new Event({
    name: 'Open Air Jazz Jam',
    creator: 'Super Jazz Band',
    genre: 'Jazz',
    about: 'This will be the best street concert in your life',
    links: 'check out our youtube channel: youtube.com/ourawesomechannel',
    tags: '#Jazz#StreetMusic',
    startTime: new Date,
    endTime: new Date,
    locationName: 'Mauer Park',
    locationCoordinates: [13.403210, 52.542681]
})

mockEvent.save()

const mockEvents = [
    {
        name: 'Djent Concert',
        creator: 'Periphery',
        genre: 'Progressive Metal',
        about: 'Come and join us!',
        links: 'listen to our music on spotify',
        tags: '#OnlyMetal#Metal',
        startTime: new Date,
        endTime: new Date,
        locationName: 'Warschauer Straße U-Bahn',
        locationCoordinates: [13.44948175, 52.5060345]
    },
    {
        name: 'New Hip Hop Band in Town',
        creator: 'Wooden Cube',
        genre: 'Hip Hop',
        about: 'I will shake this city',
        links: 'visit my page facebook.com/woodencube',
        tags: '#HipHop#StreetHipHop',
        startTime: new Date,
        endTime: new Date,
        locationName: 'Eiserner Brücke',
        locationCoordinates: [13.397288, 52.519315]
    },
    {
        name: 'Sakura',
        creator: 'Hiroko Takashima',
        genre: 'Japanese folksong',
        about: 'A very rare chance to learn more about Japanese culture',
        links: '',
        tags: '#Japana #Folk Music',
        startTime: new Date,
        endTime: new Date,
        locationName: 'Hackescher Markt',
        locationCoordinates: [13.402751, 52.523119]
    }
]

Event.insertMany(mockEvents)
    .then(data => {
        console.log(data)
    })
    .catch((e) => {
        console.log('this did not work', e.message)
    })