class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  add(user, requestTitle, requestDate, requestContent) {
    let query = this.knex.select("id").from("users").where("users.name", user);

    return query.then((rows) => {
      // console.log(rows[0].id, "<==== this is the id");
      if (rows.length === 1) {
        return this.knex
          .insert({
            user_id: rows[0].id,
            request_title: requestTitle,
            planned_date: requestDate,
            request_msg: requestContent,
          })
          .into("requests");
      } else {
        throw new Error(`Cannot add a request to a user that doesn't exist`);
      }
    });
  }

  list(user, place) {
    if (typeof user !== "undefined") {
      let queryUserPeriod = this.knex
        .select("user_id", "period_start", "period_end")
        .from("user_places_period")
        .innerJoin("users", "user_places_period.user_id", "users.id")
        .where("users.username", user);

      return queryUserPeriod.then((rowsUserPeriod) => {
        if (rowsUserPeriod.length === 1) {
          let queryRequests = this.knex
            .select(
              "requests.id",
              "requests.user_id",
              "users.name",
              "requests.planned_date",
              "requests.request_title",
              "requests.request_msg"
            )
            .from("requests")
            .innerJoin("users", "users.id", "requests.user_id")
            .where("places.place", place)
            .whereBetween("requests.planned_date", [rowsUserPeriod[0].period_start, rowsUserPeriod[0].period_end])
            .orderBy("requests.id", "desc");

          return queryRequests.then((rowsRequests) => {
            return rowsRequests.map((rowRequest) => ({
              requestId: rowRequest.id,
              title: rowRequest.request_title,
              user: rowRequest.name,
              date: rowRequest.planned_date,
              content: rowRequest.request_msg,
            }));
          });
        } else {
          throw new Error(`User querying error.`);
        }
      });
    } else {
      throw new Error(`User undefined.`);
    }
  }

  listUserRequests(user) {
    if (typeof user !== "undefined") {
      let queryUserRequestId = this.knex
        .select("request_id")
        .from("chatroom_content")
        .where("users.name", user)
        .groupBy("request_id")
        .having("count", ">=", 1);

      return queryUserRequestId.then((rowsUserRequestId) => {
        if (rowsUserRequestId.length >= 1) {
          let requestIdArray = [];
          for (const rowUserRequestId of rowsUserRequestId) {
            return requestIdArray.push(rowUserRequestId.request_id);
          }

          let queryRequests = this.knex
            .select(
              "requests.id",
              "requests.user_id",
              "users.name",
              "requests.planned_date",
              "requests.request_title",
              "requests.request_msg"
            )
            .from("requests")
            .whereIn("request.id", requestIdArray)
            .orderBy("requests.id", "desc");

          return queryRequests.then((rowsRequests) => {
            return rowsRequests.map((rowRequest) => ({
              requestId: rowRequest.id,
              title: rowRequest.request_title,
              user: rowRequest.name,
              date: rowRequest.planned_date,
              content: rowRequest.request_msg,
            }));
          });
        } else {
          throw new Error(`User querying error.`);
        }
      });
    } else {
      throw new Error(`User undefined.`);
    }
  }

  update(requestId, content, user) {
    let query = this.knex.select("id").from("users").where("users.name", user);

    return query.then((rows) => {
      if (rows.length === 1) {
        return this.knex("requests").where("id", requestId).update({
          request_msg: content,
        });
      } else {
        throw new Error(`Cannot update a note if the user doesn't exist!`);
      }
    });
  }

  remove(requestId, user) {
    let query = this.knex.select("id").from("users").where("users.name", user);

    return query.then((rows) => {
      if (rows.length === 1) {
        return this.knex("notes").where("id", requestId).del();
      } else {
        throw new Error(`Cannot remove a note when the user doesn't exist`);
      }
    });
  }
}

module.exports = NoteService;
