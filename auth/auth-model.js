const db = require('../data/config/config.js');

module.exports = {
    addUser,
    getUsers,
    findUser,
    getUserId,
    updateUser,
    removeUser
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

function getUserId(id) {
  return db('users').where({ user_id: Number(id) });
}

function updateUser(id, user) {
  return db('users')
    .where({ user_id: Number(id) })
    .update(user);
}

function removeUser(id) {
  return db('users')
    .where({ user_id: Number(id) })
    .del();
}