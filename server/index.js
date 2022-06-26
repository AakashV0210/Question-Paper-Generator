//AUTHENTICATION

const express = require("express");
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
// const upload = require("express-fileupload");
// const path = require("path");

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
const { edit_page, edit_entry } = require("./src/routes_function/edit_entry");
const { delete_entry } = require("./src/routes_function/delete_entry");
const { add_entry } = require("./src/routes_function/add_entry");
const {
  generate_questions_2,
} = require("./src/routes_function/generate_questions_2");

initializePassport(passport);

app.set("views", "../client/views");
app.set("view-engine", "ejs");

// app.use(upload());
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
  res.render("index.ejs", { path: req.url });
});

//----------------TEACHER PAGE ROUTES------------------------------------------------------------

app.get("/users/teacher_login", checkNotAuthenticated, (req, res) => {
  res.render("teacher_login.ejs", { path: req.url });
});

app.post(
  "/users/teacher_login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/teacher_page/view-questions-all",
    failureRedirect: "/users/teacher_login",
    failureFlash: true,
  })
);

app.get("/users/teacher_register", checkNotAuthenticated, (req, res) => {
  res.render("teacher_register.ejs", { path: req.url });
});

app.post("/users/teacher_register", checkNotAuthenticated, async (req, res) => {
  registration(req, res);
});

app.get("/teacher_page", checkAuthenticated, (req, res) => {
  // console.log(req.isAuthenticated());
  res.render("teacher_page.ejs", { user: req.user.name, path: req.url });
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

app.get("/teacher_page/csv-to-db", (req, res) => {
  csv_to_db(req, res);
});
// app.get("/upload", (req, res) => {
//   res.sendFile(__dirname + "../client/views/teacher_page.ejs");
// });
// app.post("/upload", (req, res) => {
//   if (req.files) {
//     console.log(req.files);
//     var file = req.files.file;
//     var filename = file.name;
//     console.log(filename);

//     file.mv("./assets/" + filename, function (err) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send("file uploaded");
//         res.redirect("/teacher_page/csv-to-db/" + filename);
//       }
//     });
//   }
// });

app.get(
  "/teacher_page/generate-questions/:syllabus/:semester/:chapter",
  checkAuthenticated,
  (req, res) => {
    generate_questions_2(req, res);
  }
);

app.get(
  "/teacher_page/generate-questions/:syllabus/:semester",
  checkAuthenticated,
  (req, res) => {
    generate_questions(req, res);
  }
);

app.get(
  "/teacher_page/generate-question-view",
  checkAuthenticated,
  (req, res) => {
    res.render("teacher_page.ejs", { user: req.user.name, path: req.url });
  }
);

app.get(
  "/teacher_page/view-questions/:filter/:filter_value",
  checkAuthenticated,
  (req, res) => {
    view_all_questions(req, res);
  }
);

app.get("/teacher_page/view-questions-all", checkAuthenticated, (req, res) => {
  view_all_questions(req, res);
});

app.get("/teacher_page/edit-page/:id", checkAuthenticated, (req, res) => {
  // console.log(req.params);
  edit_page(req, res);
});

app.get(
  "/teacher_page/edit-entry/:id/:syllabus/:semester/:chapter/:unit/:marks/:priority/:question",
  checkAuthenticated,
  (req, res) => {
    edit_entry(req, res);
  }
);

app.get("/teacher_page/delete-entry/:id", checkAuthenticated, (req, res) => {
  delete_entry(req, res);
});

app.get("/teacher_page/add-page", checkAuthenticated, (req, res) => {
  res.render("teacher_page.ejs", { user: req.user.name, path: req.url });
});

app.get(
  "/teacher_page/add-entry/:syllabus/:semester/:chapter/:unit/:marks/:priority/:question",
  checkAuthenticated,
  (req, res) => {
    add_entry(req, res);
  }
);

//--------------------STUDENT PAGE ROUTES-----------------------------------------------------------

app.get("/student_page", (req, res) => {
  // console.log(req.isAuthenticated());
  res.render("student_page.ejs", { path: req.url });
});

app.get(
  "/student_page/generate-questions/:syllabus/:semester/:chapter",
  (req, res) => {
    generate_questions_2(req, res);
  }
);

app.get("/student_page/generate-questions/:syllabus/:semester", (req, res) => {
  generate_questions(req, res);
});

app.get("/student_page/generate-question-view", (req, res) => {
  res.render("student_page.ejs", { path: req.url });
});

app.get("/student_page/view-questions/:filter/:filter_value", (req, res) => {
  view_all_questions(req, res);
});

app.get("/student_page/view-questions-all", (req, res) => {
  view_all_questions(req, res);
});

//-------------------------------------------------------------------------------------------------

app.get("*", (req, res) => {
  res.send("Sorry, this is an invalid URL.");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
