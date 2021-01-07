const express = require("express");
const mainController = require("../controllers/main");
const authController = require("../controllers/auth");

const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("authenicated");
    return next();
  }
  console.log("not authenicated");
  res.redirect("/login");
}

router.get("/", mainController.getIndex);

router.get("/logged", isLoggedIn, mainController.getLoggedIndex);

router.post("/logged", mainController.postLoggedIndex);

router.get("/login", authController.loginPage);

router.post("/login", authController.loggingIn);

router.get("/signup", authController.signUp);

router.post("/signup", authController.signingUp);

router.get("/logout", authController.logout);

router.get("/mypage", isLoggedIn, mainController.getProfile);

router.get("/travel/:city", mainController.getCities);

router.get("/logged/travel/:city", isLoggedIn, mainController.getCities);

router.get('/logged/travel/:city/:placeId', isLoggedIn, mainController.getPlaces);

router.post('/logged/travel/', isLoggedIn, mainController.postUserPlan);

router.post('/newrequest', mainController.postRequest)

router.get('/logged/travel/:city/:placeId/:requestId', isLoggedIn, mainController.startChat);

module.exports = router;
