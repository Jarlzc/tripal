const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

function saveUserPlan(username, placeId, periodStart, periodEnd) {
    let userId
    console.log('saving')
    let query = knex('users').select('id').where('username', username);
    query.then((rows)=> {
        userId = rows[0].id;
        console.log(userId)
        console.log(placeId)
        console.log(periodStart)
        console.log(periodEnd)
        knex('user_places_period').insert({user_id: userId, places_id: placeId, period_start: periodStart, period_end: periodEnd}).then((a)=> console.log())
    }).catch((err)=> console.log(err))
}

module.exports.saveUserPlan = saveUserPlan;