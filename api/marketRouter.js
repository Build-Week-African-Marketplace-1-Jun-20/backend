const express = require('express');
const db = require('../data/config/config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('market')
    .then(data => {
        res.json(data); 
    })
    .catch (error => {
        res.status(500).json({ message: 'Failed to retrieve data', error });
    });
});


router.get('/:id', (req, res) => {
const { id } = req.params;

    db('market').where({ id }).first()
    .then(data => {
        res.json(data);
    }) 
    .catch (error => {
        res.status(500).json({ message: 'Failed to retrieve data', error });
    });
});


router.post('/', (req, res) => {
const userInfo = req.body;

    db('market').insert(userInfo)
    .then(ids => {
        db('market').where({ id: ids[0] })
        .then(newItem => {
            res.status(201).json(newItem);
        });
    })
    .catch (error => {
        res.status(500).json({ message: "Failed to store data", error });
    });
});


module.exports = router;