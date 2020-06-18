const db = require('../data/config/config.js');

module.exports = {
    addUser,
    getUsers,
    findUser
};

function addUser(user) {
    return db('users').insert(user);
}

function getUsers() {
    return db('users');
}

function findUser(username) {
    return db('users').where(username);
}