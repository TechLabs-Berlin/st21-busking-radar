const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config')
const app = express();
const PORT = process.env.PORT || 8080;



app.set('PORT', PORT);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


//importing routes
const eventRoutes = require('./routes/events.js');
const geocodingRoutes = require('./routes/geocoding.js');
const userRoutes = require('./routes/user.js')
const authRoutes = require('./routes/auth.js')
// const profileRoutes = require('./routes/profile.js')
//this says that every route in the routes/events is gonna start with /events
//all the routes are now is localhost:8080/events
app.use('/events', eventRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
// app.use('/profile', profileRoutes);


app.use('/geocoding', geocodingRoutes);




//connecting to mongoose => connection url must be secured later!!! after mongodb+srv should be the username and password written
//in order to be able to connect ask me for the password and username, but please always delete them before pushing to github
//I will try to figure out how to secure that as soon as possible.
const CONNECTION_URL = config.get('mongoURI')
mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is up! Port: ${PORT}!`)
    })
}).catch((e) => {
    console.log('This did not work', e.message)
})
mongoose.set('useFindAndModify', false)

