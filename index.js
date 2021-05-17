const express = require('express');
const app = express();
const PORT = 8080;

app.use((req, res) => {
    res.send('Hello Buskers')
})

app.listen(PORT, () => {
    console.log('Server 8080 is up!')
})