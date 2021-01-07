exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('places').del()
    .then(function () {
      // Inserts seed entries
      return knex('places').insert([{
          city_id: 1,
          place: 'Repulse Bay',
          type_id: 1,
          place_thumb: 'https://i.imgur.com/UQxBkaw.png',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque ac est ac sagittis. Sed et mi quis nunc imperdiet iaculis sit amet nec ante. Morbi mollis.'
        },
        {
          city_id: 1,
          place: 'Man Mo Temple',
          type_id: 1,
          place_thumb: 'https://i.imgur.com/XtUIMDY.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 1,
          place: 'The Peak',
          type_id: 1,
          place_thumb: 'https://i.imgur.com/wHKC9Ne.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 1,
          place: 'The Big buddha',
          type_id: 1,
          place_thumb: 'https://i.imgur.com/gSWhR2N.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 1,
          place: 'Hong Kong Disneyland',
          type_id: 2,
          place_thumb: 'https://i.imgur.com/Biqzlf2.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 1,
          place: 'Ocean Park',
          type_id: 2,
          place_thumb: 'https://i.imgur.com/ZWRee7J.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 1,
          place: "Snoopy's World",
          type_id: 2,
          place_thumb: 'https://i.imgur.com/5ZOQW5A.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 2,
          place: "Chiang Kai-shek Memorial Hall",
          type_id: 1,
          place_thumb: 'https://i.imgur.com/YQDUdXN.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 2,
          place: "Shilin Night Market",
          type_id: 1,
          place_thumb: 'https://i.imgur.com/NYSG7pn.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 2,
          place: "Taipei 101",
          type_id: 1,
          place_thumb: 'https://i.imgur.com/0NGiTyP.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 2,
          place: "Ximending",
          type_id: 1,
          place_thumb: 'https://i.imgur.com/mJopoIm.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 2,
          place: "Formosan Aboriginal Culture Village",
          type_id: 2,
          place_thumb: 'https://i.imgur.com/R6JOYNN.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 2,
          place: "Yun Hsien Resort",
          type_id: 2,
          place_thumb: 'https://i.imgur.com/5MM5KD3.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 2,
          place: "Janfusan Fancy World",
          type_id: 2,
          place_thumb: 'https://i.imgur.com/88Z22Nx.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 2,
          place: "Yehliu Ocean World",
          type_id: 2,
          place_thumb: 'https://i.imgur.com/6RYC6fs.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 3,
          place: "Meiji Shrine",
          type_id: 1,
          place_thumb: 'https://i.imgur.com/xptread.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 3,
          place: "Tokyo Skytree",
          type_id: 1,
          place_thumb: 'https://i.imgur.com/vBUgIHW.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 3,
          place: "Tokyo Tower",
          type_id: 1,
          place_thumb: 'https://i.imgur.com/fQ8hl32.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 3,
          place: "Ueno Park",
          type_id: 1,
          place_thumb: 'https://i.imgur.com/7LuLr0j.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 3,
          place: "Sanrio Puroland",
          type_id: 2,
          place_thumb: 'https://i.imgur.com/9Qfz7Z1.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 3,
          place: "Tokyo Disney Resort",
          type_id: 2,
          place_thumb: 'https://i.imgur.com/vtGA7ZK.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: ''
        },
        {
          city_id: 3,
          place: "Tokyo Dome City",
          type_id: 2,
          place_thumb: 'https://i.imgur.com/FuNEZY9.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        },
        {
          city_id: 3,
          place: "VR Park Tokyo",
          type_id: 2,
          place_thumb: 'https://i.imgur.com/W89wn6O.jpg',
          describe_s: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra.',
          describe_l: 'Vestibulum nec sem cursus, cursus dolor quis, pretium risus. Maecenas sed dolor urna. Ut massa sem, tempus quis libero quis, volutpat tristique nisi. Phasellus egestas diam vel.'
        }
      ]);
    });
};