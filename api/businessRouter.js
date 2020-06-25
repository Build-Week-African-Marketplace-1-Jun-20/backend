const express = require('express');
const db = require('../data/config/config.js');
const authenticate = require('../auth/authenticate-middleware.js');

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


router.put('/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const businessInfo = req.body;
    
    db('business').where({ id: Number(id) }).update(businessInfo)
    .then(data => {
            if (data) {
                res.status(200).json({ message: "Updated business information"});
            } else {
                res.status(404).json({ message: "The business with the specified ID does not exist." });
            }
        })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The information could not be retrieved."
        });
    });
});


router.delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;
    
    db('business').where({ id: Number(id) }).del()
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "The requested business has been removed."});
        } else {
            res.status(404).json({ message: "The business with the specified ID does not exist." });
        }
        })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error Retrieving The Requested Data." });
    });
});


module.exports = router;