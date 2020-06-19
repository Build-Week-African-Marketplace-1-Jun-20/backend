
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('business').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('business').insert([
        {
          name: 'devin solutions',
          description: 'development placeholder',
          location: 'place of hold',
          user_id: '1'
        },
        {
          name: 'placemate',
          description: 'placeholder description',
          location: 'new place',
          user_id: '2'
        }
      ]);
    });
};
