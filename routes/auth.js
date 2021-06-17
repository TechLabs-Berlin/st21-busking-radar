const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js')


const authen = require('../controllers/auth.js');

router.get('/', auth, authen.getUserData);

router.post('/', authen.authUser);

// router.post('/', events.createEvent)

// router.patch('/update/:id', events.updateEvent)

// router.delete('/:id', events.deleteEvent)

module.exports = router;