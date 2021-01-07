$(() => {
  $("#start-new-chat").on("click", function (e) {
    e.preventDefault();
    let periodStart = localStorage.getItem("departing");
    let periodEnd = localStorage.getItem("returning");
    let placeId = $('#placeId').val();
    let userName = $('#username').val();
    console.log('startnewchat', periodStart, periodEnd, placeId, userName)

    axios.post("/newrequest", {
        userName: userName,
        placeId: placeId,
        periodStart: periodStart,
        periodEnd: periodEnd
    }).then(function (res) {
        console.log("response from api")
    })
  });
});
