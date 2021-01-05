const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

module.exports = class UserPlan {
    constructor (username, placeId, periodStart, periodEnd) {
        this.username = username;
        this.placeId = placeId;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd
    }

    save() {
        let userId
        console.log('saving')
        let query = knex('users').select('id').where('username', this.username);
        query.then((rows)=> {
            userId = rows[0].id;
            knex('user_places_period').insert({user_id: userId, place_id: this.placeId, period_start: this.periodStart, period_end: this.periodEnd})
        }).catch((err)=> console.log(err))
    }

}