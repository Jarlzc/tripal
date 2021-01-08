$(() => {
  $("#start-new-chat").on("click", function (e) {
    e.preventDefault();
    let periodStart = localStorage.getItem("departing");
    let periodEnd = localStorage.getItem("returning");
    let placeId = $('#placeId').val();
    let userName = $('#username').val();
    let chatTitle = $('#chat_title').val();
    let chatDescribe = $('#chat_discribe').val();
    let cityName = $('#cityname').val();
    console.log('startnewchat', periodStart, periodEnd, placeId, userName, chatTitle)

    axios.post("/newrequest", {
        userName: userName,
        placeId: placeId,
        periodStart: periodStart,
        periodEnd: periodEnd,
        chatTitle: chatTitle,
        chatDescribe: chatDescribe,
        cityName: cityName
    }).then(function (res) {
        window.location.reload();
    })
  });
});
