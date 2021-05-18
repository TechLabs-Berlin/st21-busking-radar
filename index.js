const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.set('PORT', PORT);

//testing the requests and connection
const users = []

const userInfo = [{ name: 'newname', userType: 'busker' }]

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
    users.push(req.body)
    console.log(req.body)
    console.log('user data received')
    console.log(users)
})

app.get('/user', (req, res) => {
    res.send(userInfo)
})



app.listen(PORT, () => {
    console.log('Server 8080 is up!')
})

