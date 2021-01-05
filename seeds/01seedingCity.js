
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('city').del()
    .then(function () {
      // Inserts seed entries
      return knex('city').insert([
        {name: 'Hong Kong', describe:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu diam sit amet metus dictum.' },
        {name: 'Taipei', describe:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu diam sit amet metus dictum.' },
        {name: 'Tokyo', describe:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu diam sit amet metus dictum.' }

      ]);
    });
};
