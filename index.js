//AUTHENTICATION

const express = require("express");
const app = express();
const pool = require("./dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const initializePassport = require("./passportConfig");

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./middlewares/auth");

initializePassport(passport);

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

app.use(express.static(__dirname + "/public"));

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
  let { name, email, password, password2 } = req.body;

  // console.log({
  //   name,
  //   email,
  //   password,
  //   password2,
  // });

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("teacher_register.ejs", { errors });
  } else {
    // Form validation has passed

    let hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    pool.query(
      `SELECT * FROM users
            WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        // console.log(results.rows);

        if (results.rows.length > 0) {
          errors.push({ message: "Email already registered" });
          res.render("teacher_register.ejs", { errors });
        } else {
          pool.query(
            `INSERT INTO users (name, email, password)
                        VALUES ($1, $2, $3)
                        RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              // console.log(results.rows);
              req.flash("success_msg", "You are now registered. Please log in");
              res.redirect("/users/teacher_login");
            }
          );
        }
      }
    );
  }
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
