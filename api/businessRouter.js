const express = require('express');
const db = require('../data/config/config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('business')
    .then(data => {
        res.json(data); 
    })
    .catch (error => {
        res.status(500).json({ message: 'Failed to retrieve data', error });
    });
});


router.get('/:id', (req, res) => {
const { id } = req.params;

    db('business').where({ id }).first()
    .then(data => {
        res.json(data);
    }) 
    .catch (error => {
        res.status(500).json({ message: 'Failed to retrieve data', error });
    });
});


router.post('/', (req, res) => {
const userInfo = req.body;

    db('business').insert(userInfo)
    .then(ids => {
        db('business').where({ id: ids[0] })
        .then(newBusiness => {
            res.status(201).json(newBusiness);
        });
    })
    .catch (error => {
        res.status(500).json({ message: "Failed to store data", error });
    });
});


module.exports = router;