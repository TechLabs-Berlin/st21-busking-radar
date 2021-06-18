const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

module.exports.signUpUser = async (req, res) => {
    try {
        const userData = await req.body
        //validation
        if (!userData.name || !userData.password || !userData.email) {
            return res.status(400).json({ msg: 'Please enter all fields' })
        }
        User.findOne({ email: userData.email }).then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' })

            const newUser = new User({ ...userData })

            // create salt and hash
            bcrypt.genSalt(10, (e, salt) => {
                bcrypt.hash(newUser.password, salt, (e, hash) => {
                    if (e) throw e
                    newUser.password = hash;
                    newUser.save().then(user => {
                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 7200 },
                            (e, token) => {
                                if (e) throw e
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        register_date: user.register_date,
                                        events: user.events,
                                        socialNetLinks: user.socialNetLinks,
                                        email: user.email,
                                        selectedFile: user.selectedFile
                                    }
                                })
                            }
                        )
                    }
                    )
                })
            })
        })
    } catch (e) {
        console.log('This did not work!', e.message)
    }
}