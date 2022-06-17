//AUTHENTICATION

const express = require("express");
const app = express();
const pool = require("./src/config/dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const initializePassport = require("./src/config/passportConfig");

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./src/middlewares/auth");
// const { csv_to_db } = require("./src/routes_function/data_extractor");

const { registration } = require("./src/routes_function/registration");
const { csv_to_db } = require("./src/routes_function/data_extractor");
const {
  generate_questions,
} = require("./src/routes_function/generate_questions");
const { view_all_questions } = require("./src/routes_function/view_questions");

initializePassport(passport);

app.set("views", "../client/views");
app.set("view-engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(__dirname.replace("server", "client/public")));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/users/teacher_login", checkNotAuthenticated, (req, res) => {
  res.render("teacher_login.ejs");
});

app.post(
  "/users/teacher_login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/teacher_page",
    failureRedirect: "/users/teacher_login",
    failureFlash: true,
  })
);

app.get("/users/teacher_register", checkNotAuthenticated, (req, res) => {
  res.render("teacher_register.ejs");
});

app.post("/users/teacher_register", checkNotAuthenticated, async (req, res) => {
  registration(req, res);
});

app.get("/teacher_page", checkAuthenticated, (req, res) => {
  // console.log(req.isAuthenticated());
  res.render("teacher_page.ejs", { user: req.user.name });
});

app.get("/users/logout", (req, res) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    } else {
      res.render("index.ejs", { message: "You have logged out successfully" });
    }
  });
});

app.put("/csv-to-db", (req, res) => {
  csv_to_db(req, res);
});

app.get("/generate-questions", (req, res) => {
  generate_questions(req, res);
});

app.get("/view-questions/:filter/:filter_value", (req, res) => {
  view_all_questions(req, res);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
