const knex = require('knex');
const config = require('../../knexfile.js');
const dev_db = knex(config.development);
const test_db = knex(config.testing);
const db = knex(config.production);

module.exports = db;