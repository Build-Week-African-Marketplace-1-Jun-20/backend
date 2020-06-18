const express = require('express');
const knex = require('knex');

const db = require('../data/config/config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('users')
    .then(data => {
        res.json(data); 
    })
    .catch (error => {
        res.status(500).json({ message: 'Failed to retrieve data', error });
    });
});


router.get('/:id', (req, res) => {
const { id } = req.params;

    db('users').where({ id }).first()
    .then(data => {
        res.json(data);
    }) 
    .catch (error => {
        res.status(500).json({ message: 'Failed to retrieve data', error });
    });
});


router.post('/', (req, res) => {
const userInfo = req.body;

    db('users').insert(userInfo)
    .then(ids => {
        db('users').where({ id: ids[0] })
        .then(newUser => {
            res.status(201).json(newUser);
        });
    })
    .catch (error => {
        res.status(500).json({ message: "Failed to store data", error });
    });
});


module.exports = router;