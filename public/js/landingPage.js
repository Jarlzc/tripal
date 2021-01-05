// LANDING PAGE
// "City" placeholder typing effect
const words = ["Tokyo", "Hong Kong", "Taipei"];
let i = 0;
let timer;

function typingEffect() {
  let word = words[i].split("");
  var loopTyping = function () {
    if (word.length > 0) {
      let elem = document.getElementById("city");
      elem.setAttribute("placeholder", elem.getAttribute("placeholder") + word.shift());
    } else {
      deletingEffect();
      return false;
    }
    timer = setTimeout(loopTyping, 400);
  };
  loopTyping();
}

function deletingEffect() {
  let word = words[i].split("");
  var loopDeleting = function () {
    if (word.length > 0) {
      word.pop();
      document.getElementById("city").setAttribute("placeholder", word.join(""));
    } else {
      if (words.length > i + 1) {
        i++;
      } else {
        i = 0;
      }
      typingEffect();
      return false;
    }
    timer = setTimeout(loopDeleting, 200);
  };
  loopDeleting();
}

// Clear storage
function clearStorage() {
  return localStorage.clear();
}

// Storage of period data
function periodDataStorage() {
  let departingDate = $("#departing-date").val();
  let returningDate = $("#returning-date").val();

  console.log(departingDate);

  localStorage.setItem("departing", departingDate);
  localStorage.setItem("returning", returningDate);
}

//

// CITY PAGE
function periodDataRetrieve(placeId) {
  let periodStart = localStorage.getItem("departing");
  let periodEnd = localStorage.getItem("returning");
  let cityName = $("#city-name").text();
  // let placeId = $(this).attr("id");

  console.log("period:", periodStart, "period:", periodEnd , "id", placeId);

  axios
    .post(`/logged/travel/${cityName}/${placeId}`, {
      period_start: periodStart,
      period_end: periodEnd,
      placeId: placeId,
    })
    .then((res) => {
      console.log( res);
    })
    .catch(function (error) {
      console.log(error)
    })
}
