const jwt = require('jsonwebtoken');
const secrets = require('../data/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('bk: auth-middleware: token: ', token);

    if (req.decodedJwt) {
        next();
    } else if (token) {
        jwt.verify(token, secrets.jwtSecret, (error, decodedJwt) => {
            if (error) {
                res.status(401).json({ message: 'invalid token', error: error });
            } else {
                req.decodedJwt = decodedJwt;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'no valid token found' });
    }
}