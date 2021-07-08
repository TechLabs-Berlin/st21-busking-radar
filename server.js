const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config')
const app = express();
const path = require('path')
const publicPath = path.join(__dirname, 'client', 'build')





app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(publicPath)));
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 8080;

app.set('PORT', PORT);
//importing routes
const eventsRouter = require('./routes/events.js');
const geocodingRouter = require('./routes/geocoding.js');
const userRouter = require('./routes/user.js')
const authRouter = require('./routes/auth.js')




app.use('/api', geocodingRouter);
app.use('/api', eventsRouter);
app.use('/api', userRouter);
app.use('/api', authRouter);
// if (process.env.NODE_ENV === 'production') {
//     // Serve any static files
//     app.use(express.static(path.join(publicPath)));
//     // Handle React routing, return all requests to React app
//     app.get('/*', function (req, res) {
//         res.sendFile(path.join(publicPath, 'index.html'));
//     });
// } //<- at the moment we don't need that

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
    res.sendFile(path.resolve(publicPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is up! Port: ${PORT}!`)
})





