const bcrypt = require("bcrypt");
const pool = require("../config/dbConfig");

exports.registration = async (req, res) => {
  let { name, email, password, password2 } = req.body;

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
    return res.render("teacher_register.ejs", { errors });
  } else {
    // Form validation has passed

    let hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        // console.log(results.rows);

        if (results.rows.length > 0) {
          errors.push({ message: "Email already registered" });
          return res.render("teacher_register.ejs", { errors });
        } else {
          pool.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              // console.log(results.rows);
              req.flash("success_msg", "You are now registered. Please log in");
              return res.redirect("/users/teacher_login");
            }
          );
        }
      }
    );
  }
};
