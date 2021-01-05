
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('city_photo').del()
    .then(function () {
      // Inserts seed entries
      return knex('city_photo').insert([
        {city_id: 1, photo_link: 'https://i.imgur.com/1zH2ibb.jpg'},
        {city_id: 1, photo_link: 'https://i.imgur.com/5zC88qh.jpg'},
        {city_id: 1, photo_link: 'https://i.imgur.com/5zC88qh.jpg'},
        {city_id: 2, photo_link: 'https://i.imgur.com/z4VNQl6.jpg'},
        {city_id: 2, photo_link: 'https://i.imgur.com/uz0Dx82.jpg'},
        {city_id: 2, photo_link: 'https://i.imgur.com/p7vWoFt.jpg'},
        {city_id: 3, photo_link: 'https://i.imgur.com/ZMT5bm4.jpg'},
        {city_id: 3, photo_link: 'https://i.imgur.com/JajlqhV.jpg'},
        {city_id: 3, photo_link: 'https://i.imgur.com/Epr52FV.jpg'}
      ]);
    });
};
