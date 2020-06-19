exports.up = function(knex) {
    return knex.schema
        .createTable('users', users => {
            users.increments('user_id').primary;
            users
                .string('username', 255)
                .unique()
                .notNullable();
            users.string('password', 255).notNullable();
        })

        .createTable('business', tbl => {
            tbl.increments('id').primary;
            tbl.text('name', 128).notNullable();
            tbl.text('description', 128).notNullable();
            tbl.text('location', 128).notNullable();
            tbl.integer('user_id', 128)
                .references('user_id')
                .inTable('users')
                .notNullable()
                .onDelete('cascade');
        })

        .createTable('market', tbl => {
            tbl.increments();
            tbl.text('item', 128).notNullable();
            tbl.text('description', 128);
            tbl.text('location', 128).notNullable();
            tbl.text('price', 128).notNullable();
            tbl.integer('business_id', 128)
                .references('id')
                .inTable('business')
                .notNullable()
                .onDelete('cascade');
        })
};

exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists('market')
        .dropTableIfExists('business')
        .dropTableIfExists('users');
};
