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

// Background image changes
$(document).ready(function () {
  // Change background image with time interval
  var coverImages = [
    "/assets/mates/landscape-4254269.jpg",
    "/assets/mates/friend-2033734.jpg",
    "/assets/mates/water-2569463.jpg",
    "/assets/mates/water-3266211.jpg",
    "/assets/mates/friend-2033734.jpg",
  ];
  var i = 0;
  setInterval(() => {
    $(".cover-wrapper").css("background-image", `url('${coverImages[i]}')`);
    i++;
    if (i == coverImages.length) {
      i = 0;
    }
  }, 10000);

  // Change in background color of the navbar when scrolling
  $(document).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").removeClass("bg-transparent").css("background-color", "#efca08");
    } else {
      $(".navbar").addClass("bg-transparent").css("background-color", "");
    }
  });

  // Trigger fade-in effect of Animate CSS when scrolling to specific y-coordinate in 'About' Section
  $(document).scroll(function () {
    var windowHeight = window.innerHeight;
    if ($(this).scrollTop() > windowHeight * 0.5) {
      $(".intro-title-box").css("visibility", "visible").addClass("animate__animated animate__fadeInUp");
    }
    if ($(this).scrollTop() > windowHeight * 0.8) {
      $("#function-box-1").css("visibility", "visible").addClass("animate__animated animate__fadeInUp");
    }
    if ($(this).scrollTop() > windowHeight * 0.9) {
      $("#function-box-2").css("visibility", "visible").addClass("animate__animated animate__fadeInUp");
    }
    if ($(this).scrollTop() > windowHeight * 1.0) {
      $("#function-box-3").css("visibility", "visible").addClass("animate__animated animate__fadeInUp");
    }
  });
});

// CITY PAGE
function periodDataRetrieve() {
  let periodStart = localStorage.getItem("departing");
  let periodEnd = localStorage.getItem("returning");
  let cityName = $("#city-name").text();
  let placeId = $(".hidden-placeId").text();

  console.log("period:", periodStart, "period:", periodEnd);

  let buttons = document.getElementsByClassName("place-button");

  let bodyData = {
    period_start: periodStart,
    period_end: periodEnd,
    placeId: placeId,
    cityName: cityName,
  };

  axios
    .post(`/logged/travel/${cityName}/${placeId}`, {
      period_start: periodStart,
      period_end: periodEnd,
      placeId: placeId,
    })
    .then((res) => {
      console.log(res);
    });

  // for (let i = 0; i < buttons.length; i++) {
  //   buttons[i].addEventListener("click", async (_) => {
  //     try {
  //       const response = await fetch(`/travel/${cityName}/${placeId}`, {
  //         method: "post",
  //         body: JSON.stringify(bodyData),
  //       });
  //       console.log("Completed!", response);
  //     } catch (err) {
  //       console.error(`Error: ${err}`);
  //     }
  //   });
  // }
}
