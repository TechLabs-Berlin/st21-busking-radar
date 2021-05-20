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

// const mockEvent = new Event({
//     name: 'Open Air Jazz Jam',
//     creator: 'Super Jazz Band',
//     genre: 'Jazz',
//     about: 'This will be the best street concert in your life',
//     links: 'check out our youtube channel: youtube.com/ourawesomechannel',
//     tags: '#Jazz#StreetMusic',
//     time: '12 June 2021',
//     location: 'Mauer Park'
// })

const mockEvents = [
    {
        name: 'Djent Concert',
        creator: 'Periphery',
        genre: 'Progressive Metal',
        about: 'Come and join us!',
        links: 'listen to our music on spotify',
        tags: '#OnlyMetal#Metal',
        time: '6 July 2021',
        location: 'Warschauer Straße U-Bahn'
    },
    {
        name: 'New Hip Hop Band in Town',
        creator: 'Wooden Cube',
        genre: 'Hip Hop',
        about: 'I will shake this city',
        links: 'visit my page facebook.com/woodencube',
        tags: '#HipHop#StreetHipHop',
        time: '6 June 2021',
        location: 'Eiserner Brücke'
    },
    {
        name: 'Sakura',
        creator: 'Hiroko Takashima',
        genre: 'Japanese folksong',
        about: 'A very rare chance to learn more about Japanese culture',
        links: '',
        tags: '#Japana #Folk Music',
        time: '30 May 2021',
        location: 'Hackescher Markt'
    }
]

Event.insertMany(mockEvents)
    .then(data => {
        console.log(data)
    })
    .catch((e) => {
        console.log('this did not work', e.message)
    })