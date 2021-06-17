const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token')

    //check for token
    if (!token)
        return res.status(401).json({ msg: 'No token, authorization denied' }) //<- 401 means the user is unauthorized


    try {
        //Verify
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        //add user from payload

        req.user = decoded;
        next()
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' }) //<- 400 means bad request
    }
}

module.exports = auth;