
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('places_photo').del()
    .then(function () {
      // Inserts seed entries
      return knex('places_photo').insert([
        {places_id: 1, photo_url: 'https://i.imgur.com/djJ4KeH.jpg'},
        {places_id: 2, photo_url: 'https://i.imgur.com/vYwN2LD.jpg'},
        {places_id: 3, photo_url: 'https://i.imgur.com/Mfoygv7.jpg'},
        {places_id: 4, photo_url: 'https://i.imgur.com/fJPS4xX.jpg'},
        {places_id: 5, photo_url: 'https://i.imgur.com/0IZdl7H.jpg'},
        {places_id: 6, photo_url: 'https://i.imgur.com/4WVv7f8.jpg'},
        {places_id: 7, photo_url: 'https://i.imgur.com/Eh4UrWG.jpg'},
        {places_id: 8, photo_url: 'https://i.imgur.com/IkNbI7I.jpg'},
        {places_id: 9, photo_url: 'https://i.imgur.com/DjQ7SKF.jpg'},
        {places_id: 10, photo_url: 'https://i.imgur.com/5ahxsWb.jpg'},
        {places_id: 11, photo_url: 'https://i.imgur.com/3jTsteZ.jpg'},
        {places_id: 12, photo_url: 'https://i.imgur.com/xk80ddU.jpg'},
        {places_id: 13, photo_url: 'https://i.imgur.com/QxtgweB.jpg'},
        {places_id: 14, photo_url: 'https://i.imgur.com/b8BzwDG.jpg'},
        {places_id: 15, photo_url: 'https://i.imgur.com/3BvfAhK.jpg'},
        {places_id: 16, photo_url: 'https://i.imgur.com/QUCZPMQ.jpg'},
        {places_id: 17, photo_url: 'https://i.imgur.com/lYItWCU.jpg'},
        {places_id: 18, photo_url: 'https://i.imgur.com/Hfz7tZQ.jpg'},
        {places_id: 19, photo_url: 'https://i.imgur.com/T6QtZP2.jpg'},
        {places_id: 20, photo_url: 'https://i.imgur.com/4RkEnrv.jpg'},
        {places_id: 21, photo_url: 'https://i.imgur.com/3hlq0tN.jpg'},
        {places_id: 22, photo_url: 'https://i.imgur.com/yWQvEXv.jpg'},
        {places_id: 23, photo_url: 'https://i.imgur.com/6GAQa54.jpg'}

      ]);
    });
};
