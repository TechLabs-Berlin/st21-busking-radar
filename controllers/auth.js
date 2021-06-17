const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const auth = require('../middleware/auth.js');

module.exports.authUser = async (req, res) => {
    try {
        const userData = await req.body
        //validation
        if (!userData.password || !userData.email) {
            return res.status(400).json({ msg: 'Please enter all fields' })
        }
        User.findOne({ email: userData.email })
            .then(user => {
                if (!user) return res.status(400).json({ msg: 'User does not exist' })

                //validate password

                bcrypt.compare(userData.password, user.password)
                    .then(isMatch => {
                        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 7200 },
                            (e, token) => {
                                if (e) throw e
                                res.json({
                                    token,
                                    user
                                })
                            }
                        )
                    })
            })
    } catch (e) {
        console.log('This did not work!', e.message)
    }
}


//get user data
module.exports.getUserData = async (req, res) => {
    try {
        const foundUser = await User.findById(req.user.id).select('-password');
        res.json(foundUser);
    } catch (e) {
        res.status(400).json({ msg: 'the user is not authorized' })
    }
}