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
const itemInfo = req.body;

    db('market').insert(itemInfo)
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


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const itemInfo = req.body;
    
    db('market').where({ id: Number(id) }).update(itemInfo)
    .then(data => {
            if (data) {
                res.status(200).json({ message: "Updated item information"});
            } else {
                res.status(404).json({ message: "The item with the specified ID does not exist." });
            }
        })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The items information could not be retrieved."
        });
    });
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    db('market').where({ id: Number(id) }).del()
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "The requested item has been removed."});
        } else {
            res.status(404).json({ message: "The item with the specified ID does not exist." });
        }
        })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error Retrieving The Requested Data." });
    });
});


module.exports = router;