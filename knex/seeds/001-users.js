
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'devin',
          password: 'dev@devin007'
        },
        {
          username: 'placeholder',
          password: '@1234'
        }
      ]);
    });
};
