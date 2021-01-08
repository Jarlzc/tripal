const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

//non repeat random number function
function shuffle() {
  let array, temp;
  array = [1, 2, 3, 4, 5, 6, 7];
  (i = array.length), (j = 0), temp;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

//query place by city name
function query_for_city(reqParams, cb) {
  let output = {};
  let query0 = knex
    .select("name", "city_photo.photo_link")
    .where("name", reqParams)
    .from("city")
    .join("city_photo", "city.id", "=", "city_photo.city_id");

  let query1 = knex
    .select("places.id", "place", "place_thumb", "describe_s")
    .from("places")
    .join("city", "city.id", "places.city_id")
    .join("places_types", "places_types.id", "places.type_id")
    .where("city.name", reqParams)
    .where("places_types.type", "Visit");

  let query2 = knex
    .select("places.id", "place", "place_thumb", "describe_s")
    .from("places")
    .join("city", "city.id", "places.city_id")
    .join("places_types", "places_types.id", "places.type_id")
    .where("city.name", reqParams)
    .where("places_types.type", "Play");

  Promise.all([query0, query1, query2])
    .then((rows) => {
      output.currentCity = rows[0];
      output.placesVisit = rows[1];
      output.placesPlay = rows[2];

      cb(output);
    })
    .catch((err) => console.log(err));
}
//query place by place ID
function query_for_place(reqParams, city, cb) {
  let output = {};
  let randNum = shuffle();
  let query0 = knex
    .select("places.id", "place", "describe_l", "photo_url")
    .from("places")
    .join("places_photo", "places_id", "places.id")
    .where("places_id", reqParams);
  let query1 = knex
    .select("places.id", "place", "place_thumb", "describe_s")
    .from("places")
    .join("city", "city.id", "city_id")
    .where("name", city)
    .andWhere("places.id", "!=", reqParams);

  let query2 = knex.select("*")
      .from("requests").where("place_id", reqParams);

  Promise.all([query0, query1, query2])
    .then((rows) => {
      output.currentPlace = rows[0];
      output.randomPlace = [rows[1][0], rows[1][1], rows[1][2]];
      output.requests = rows[2]
      // console.log(rows[2]);
      cb(output);
    })
    .catch((err) => console.log("error: ", err));
}

function query_for_myPage(username, cb) {
  let query = knex.select("profile_pic_url").where("username", username);
  query
    .then((data) => {
      cb(data);
    })
    .catch((err) => console.log(err));
}

function query_for_chatroom (reqParams, cb) {
  let query0 = knex
    .select("place")
    .from("places")
    .where("places.id", reqParams);
    query0.then((data)=> {
      cb (data);
    }).catch((err) => console.log(err));
      
}

// query_for_chatroom(1 , (row)=> {
//   console.log(row[0].place)
// })
// query_for_myPage('sam');

// query_for_place(7, 'Taipei', (rows)=> {
//   console.log(rows)
// });
// query_for_place(7, (rows)=> {
//   console.log(rows)
// });


function insertNewRequest (userName, placeId, periodStart, periodEnd, chatTitle, chatDescribe) {
  let query0 = knex
  .select("id").from("users").where("username", userName)
  
  query0.then((row)=> {
    let userId = row[0].id;
    let insert = knex('requests').insert({
      user_id: userId,
      place_id: placeId,
      date_start: periodStart,
      date_end: periodEnd, 
      request_title: chatTitle,
      request_msg: chatDescribe
    }) 
    insert.then(_=> {}).catch((err)=> console.log(err))

  }).catch((err)=> console.log(err) )

  
  
}



module.exports.insertNewRequest = insertNewRequest; 
module.exports.query_for_city = query_for_city;
module.exports.query_for_place = query_for_place;
module.exports.query_for_myPage = query_for_myPage;
module.exports.query_for_chatroom = query_for_chatroom;

