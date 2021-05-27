const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('API working properly')
})



module.exports = router;