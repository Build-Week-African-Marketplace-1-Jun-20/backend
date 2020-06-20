// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: { filename: './data/db.db3' },
    useNullAsDefault: true,
    migrations: { directory: './knex/migrations' },
    seeds: { directory: './knex/seeds' }
  },

  testing: {
    client: 'sqlite3',
    connection: { filename: './data/db.db3' },
    useNullAsDefault: true,
    migrations: { directory: './knex/migrations' },
    seeds: { directory: './knex/seeds' }
  },

  production: {
    client: 'sqlite3',
    connection: { filename: './data/db.db3' },
    useNullAsDefault: true,
    migrations: { directory: './knex/migrations' },
    seeds: { directory: './knex/seeds' }
  }

};
