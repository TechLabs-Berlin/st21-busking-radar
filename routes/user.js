const express = require('express');
const router = express.Router();


const users = require('../controllers/user.js')

router.post('/', users.signUpUser)

module.exports = router;