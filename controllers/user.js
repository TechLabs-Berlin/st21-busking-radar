const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const mongoose = require('mongoose')

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
                                        genre: user.genre,
                                        about: user.about,
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

module.exports.updateUser = async (req, res) => {
    try {
        const { id: _id } = req.params
        const updates = req.body
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.send('No event with that id');
        }
        const updatedUser = await User.findByIdAndUpdate(_id, updates, { new: true })
        res.json({
            id: updatedUser.id,
            name: updatedUser.name,
            genre: updatedUser.genre,
            about: updatedUser.about,
            register_date: updatedUser.register_date,
            events: updatedUser.events,
            socialNetLinks: updatedUser.socialNetLinks,
            email: updatedUser.email,
            selectedFile: updatedUser.selectedFile
        })
    } catch (e) {
        console.log(e, 'this did not work')
    }
}