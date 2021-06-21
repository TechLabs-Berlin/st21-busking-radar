const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');


const users = require('../controllers/user.js')

router.post('/', users.signUpUser)

router.patch('/update/:id', auth, users.updateUser)

module.exports = router;