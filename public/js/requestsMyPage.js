let template = ejs.compile(`
<div class="place-request-box">
  <div class="place-request-card card">
    <h5 class="place-request-box-request card-title">Request #<%= userRequest.requestId %></h5>

    <div class="place-request-card-body card-body">

      <h6 class="place-request-card-subtitle card-text">Title</h6>
      <p class="place-request-card-text card-text"><%= userRequest.title %></p>

      <h6 class="place-request-card-subtitle card-text">Request User</h6>
      <p class="place-request-card-text card-text"><%= userRequest.user %></p>

      <h6 class="place-request-card-subtitle card-text">Spot</h6>
      <p class="place-request-card-text card-text"><%= userRequest.place %></p>

      <h6 class="place-request-card-subtitle card-text">Request Date</h6>
      <p class="place-request-card-text card-text"><%= userRequest.date %></p>

      <h6 class="place-request-card-subtitle card-text">Content</h6>
      <span class="input"><textarea data-id="<%= userRequest.requestId %>"><%= userRequest.content %></textarea></span>

      <div class="delete-button btn btn-xs">
        <button class="remove btn btn-xs" data-id="<%= userRequest.requestId %>"><i class="fas fa-trash" aria-hidden="true"></i></button>
      </div>
      <a href="#" class="btn btn-primary">Chat</a>

    </div>
  </div>
</div>
`);

const reloadRequest = (data) => {
  // console.log("trying");
  // console.log(data);
  $("#place-request-container").html(template({ userRequest: data }));
};

$(() => {
  axios
    .get("/api/myPage/requests")
    .then((res) => {
      // console.log(res.data, "X");
      reloadRequest(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  $("#place-request-container").on("blur", "textarea", (event) => {
    // console.log("I am editing");
    // console.log($(event.currentTarget).data("id"));

    axios
      .put("/api/myPage/requests" + $(event.currentTarget).data("id"), {
        note: $(event.currentTarget).val(),
      })
      .then((res) => {
        reloadNotes(res.data);
      })
      .catch((e) => {
        alert(e);
      });
  });

  $("#place-request-container").on("click", ".remove", (event) => {
    beginSaving(event.currentTarget);

    axios
      .delete("/api/myPage/requests" + $(event.currentTarget).data("id"))
      .then((res) => {
        reloadNotes(res.data);
      })
      .catch((e) => {
        alert(e);
      });
  });
});
