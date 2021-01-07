const express = require("express");
const session = require("express-session");
const passport = require("passport");
const passportmodel = require("./models/passport");
const app = express();
const bodyParser = require("body-parser");
const flash = require("express-flash");
const path = require("path");

const errorController = require("./controllers/error");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const socketio = require("./models/socketio")(io);

// Knex.js setup
require("dotenv").config();
const knex = require("knex")(require("./knexfile").development);

// Require User create modules
// const AuthChallenger = require("./AuthChallenger");
const NoteService = require("./NoteService/NoteService");
const NoteRouter = require("./NoteRouter/NoteRouter");
const NoteRouterMyPage = require("./NoteRouter/NoteRouterMyPage");

// For requests
const noteService = new NoteService(knex);


app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mainRoutes = require("./routes/main");

//prepare passport for local-login
passportmodel(passport);

//Setup express session
app.use(
  session({
    secret: "TriPalSecret",
    resave: false,
    saveUninitialized: false,
  })
);

//Setup middleware for passport
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/requests", new NoteRouter(noteService).router());
app.use("/api/requests/myPage", new NoteRouterMyPage(noteService).router());
app.use(flash());
app.use(mainRoutes);
app.use(errorController.get404);

// Routing for requests



http.listen(3000, () => {
  console.log("Listening on port: 3000");
});
