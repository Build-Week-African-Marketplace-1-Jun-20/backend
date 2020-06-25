exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('market').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('market').insert([
        {
            item: 'watermelon ',
            description: 'fruit',
            location: 'place of hold',
            price: '$10.00',
            business_id: '1'
        },
        {
            item: 'place mats',
            description: 'placeholder description',
            location: 'new place',
            price: '$1.00',
            business_id: '2'
        }
      ]);
    });
};