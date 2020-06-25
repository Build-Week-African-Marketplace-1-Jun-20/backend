const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./auth-model.js');
const secrets = require('../data/secrets.js');
const auth = require('./authenticate-middleware.js');


function genWebToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: "2h"
    };

    const token = jwt.sign(payload, secrets.jwtSecret, options);
    return token;
}


router.post('/register', (req, res) => {
    const newUser = req.body;

    if (newUser.username && newUser.password) {
        const hash = bcrypt.hashSync(newUser.password, 12);
        newUser.password = hash;

        User.addUser(newUser)
        .then(added => {
            let newToken = genWebToken(added);
            res.status(201).json({ message: 'User added', token: newToken });
        })
        

        .catch(err => {
            res.status(500).json({ message: 'Could not add the user', err });
        });

    } else {
        res.status(400).json({ message: 'Please enter a username and password' });
    }
});


router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        User.findUser({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                let token = genWebToken(user);
                console.log('bk: /login: token: ', token);
                res.status(200).json(token);
                // res.status(200).json({ message: `welcome ${user.name}`, token: token });
            } else {
                res.status(401).json({ message: 'Invalid user and or user credentials' });
            }
        })

        .catch(err => {
            res.status(500).json({ message: 'Could not find the user' });
        });

    } else {
        res.status(400).json({ message: 'Missing credentials' });
    }
});


module.exports = router;