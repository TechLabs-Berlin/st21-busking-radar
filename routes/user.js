const express = require('express');
const userRouter = express.Router();
const auth = require('../middleware/auth.js');


const users = require('../controllers/user.js')

userRouter.get('/user/getusers', users.getUsers)

userRouter.post('/user', users.signUpUser)

userRouter.patch('/user/update/:id', auth, users.updateUser)

module.exports = userRouter;