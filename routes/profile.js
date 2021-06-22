const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')


const authen = require('../controllers/auth.js');

// router.get('/', auth, authen.getUserData);

router.patch('/', auth, authen.authUser);

module.exports = router;