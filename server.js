const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config')
const app = express();
const path = require('path')
const publicPath = path.join(__dirname, 'client', 'build')





app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// ** MIDDLEWARE ** // 
const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://buskingradar.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
        console.log("** Origin of request " + origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin rejected")
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))
const PORT = process.env.PORT || 8080;

app.set('PORT', PORT);
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


// if (process.env.NODE_ENV === 'production') {
//     // Serve any static files
//     app.use(express.static(path.join(publicPath)));
//     // Handle React routing, return all requests to React app
//     app.get('/*', function (req, res) {
//         res.sendFile(path.join(publicPath, 'index.html'));
//     });
// }

//connecting to mongoose => connection url must be secured later!!! after mongodb+srv should be the username and password written
//in order to be able to connect ask me for the password and username, but please always delete them before pushing to github
//I will try to figure out how to secure that as soon as possible.
const CONNECTION_URL = config.get('mongoURI')
mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).catch((e) => {
    console.log('This did not work', e.message)
})
mongoose.set('useFindAndModify', false)

app.get('/*', function (req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is up! Port: ${PORT}!`)
})





