const express = require('express');
const authRouter = express.Router();
const auth = require('../middleware/auth.js')


const authen = require('../controllers/auth.js');

authRouter.get('/auth', auth, authen.getUserData);

authRouter.post('/auth', authen.authUser);

// router.post('/', events.createEvent)

// router.patch('/update/:id', events.updateEvent)

// router.delete('/:id', events.deleteEvent)

module.exports = authRouter;