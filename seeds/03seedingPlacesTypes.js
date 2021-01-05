
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('places_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('places_types').insert([
        {type: 'Visit'},
        {type: 'Play'}
      ]);
    });
};
