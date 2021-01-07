let template = ejs.compile(`
  <div class="place-request-box">
    <div class="place-request-card card">
      <h5 class="place-request-box-request card-title">Request #<%= placeRequest.requestId %></h5>

      <div class="place-request-card-body card-body">
        <h6 class="place-request-card-subtitle card-text">Title</h6>
        <p class="place-request-card-text card-text"><%= placeRequest.title %></p>


        <h6 class="place-request-card-subtitle card-text">Request User</h6>
        <p class="place-request-card-text card-text"><%= placeRequest.user %></p>

        <h6 class="place-request-card-subtitle card-text">Request Date</h6>
        <p class="place-request-card-text card-text"><%= placeRequest.date %></p>

        <h6 class="place-request-card-subtitle card-text">Content</h6>
        <p class="place-request-card-text card-text"><%= placeRequest.content %></p>

        <a href="#" class="btn btn-primary">Chat</a>
      </div>
    </div>
  </div>
`);

const reloadRequest = (data) => {
  // console.log("trying");
  // console.log(data);
  $("#place-request-box").html(template({ placeRequest: data }));
};

$(() => {
  // GET request
  axios
    .get("/api/requests")
    .then((res) => {
      // console.log(res.data, "X");
      reloadRequest(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  // POST request
  $("#add-request").submit((e) => {
    e.preventDefault();
    // console.log("add pressed");

    var val = $("textarea[name=request-content]").val();
    // console.log(val);
    if (val === "") {
      return;
    }
    $("textarea[name=request-content]").val("");
    axios
      .post("/api/requests", {
        // ????????
        content: val,
      })
      .then((res) => {
        // console.log(res.data);
        reloadRequest(JSON.parse(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
