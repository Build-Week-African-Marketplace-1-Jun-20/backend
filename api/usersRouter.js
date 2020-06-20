const express = require('express');
const db = require('../data/config/config.js');
const Users = require('../auth/auth-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Users.getUsers()
    .then(data => {
        res.json(data); 
    })
    .catch (error => {
        res.status(500).json({ message: 'Failed to retrieve data', error });
    });
});


router.get('/:id', (req, res) => {
    Users.getUserId(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The users information could not be retrieved."
            });
        });
});


router.delete('/:id', (req, res) => {
    Users.removeUser(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({message: "The requested user has been removed."});
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error Retrieving The Requested Data." });
        });
});

router.put('/:id', (req, res) => {
    const userInfo = req.body;
    Users.updateUser(req.params.id, userInfo)
    .then(data => {
            if (data) {
                res.status(200).json({ message: "Updated user information"});
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });
            }
        })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The users information could not be retrieved."
        });
    });
})


module.exports = router;