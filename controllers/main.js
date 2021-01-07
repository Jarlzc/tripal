const page = require("../models/renderpage");
const userPlan = require('../models/userplan2');

let userName, periodStart, periodEnd;

exports.getIndex = (req, res) => {
  res.render("pages/landingPage");
};
exports.getLoggedIndex = (req, res) => {
  userName = req.user.username
  res.render("pages/landingPageLogined", {username: userName} );
};

exports.postLoggedIndex = (req, res) => {
   periodStart=req.body.departDate;
   periodEnd =  req.body.returnDate;
   console.log('start', periodStart, "End", periodEnd)
  
  res.redirect(`/logged/travel/${req.body.cityInput}`);
};

exports.getProfile = (req, res) => {
   userName = req.user.username;
  page.query_for_myPage(username, (data) => {
    res.render("pages/myPage", {
      name: username,
      profilePic: data,
    });
  });
};

exports.getCities = (req, res) => {
  //query data from database
  page.query_for_city(req.params.city, (rows) => {
    res.render("pages/city", {
      currentCity: rows.currentCity,
      placesVisit: rows.placesVisit,
      placesPlay: rows.placesPlay,
    });
  });
};

exports.getPlaces = (req, res) => {
  //query data from database
  username = req.user.username;
  userPlan.saveUserPlan(username, req.params.placeId, periodStart, periodEnd)
  let currentCity = {};
  currentCity.name = req.params.city;
  page.query_for_place(req.params.placeId, currentCity.name, (rows) => {
    res.render("pages/place", {
      userName: username,
      currentPlace: rows.currentPlace,
      randomPlaces: rows.randomPlace,
      currentCity: currentCity,
    });
  });
};

exports.postUserPlan = (req, res) => {
    //input userPlan to data base
    let username = req.user.username;
    let placeId = req.body.placeId;
    let periodStart = req.body.period_start;
    let periodEnd = req.body.period_end;
    userPlan.saveUserPlan(username, placeId, periodStart, periodEnd)
    res.redirect(`/travel/${req.body}/${req.body}`);
}

exports.postRequest = (req, res) => {
  console.log("postRequest Get",  req.body)
}

exports.startChat = (req, res) => {
  // res.sendFile(process.cwd()+'/views/chat_index.html')
  let requestId = req.params.placeId;
  page.query_for_chatroom(requestId, (row)=> {
    res.render("pages/chatroom", {
    username: req.user.username,
    place: row[0].place
  });

  })
  
};
