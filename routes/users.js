const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); //to encrypt password
const passport = require("passport");

//models
const User = require("../models/User");

//Login page
router.get("/login", (req, res) => res.render("login"));

//Register page
router.get("/register", (req, res) => res.render("register"));

//Register handle
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //Checking name email password and password2 fields are filled in
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }
  //Check if password match
  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  //Password must be at least 6 characters long
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    //mongoose to find email if there is a user
    User.findOne({ email: email }).then(user => {
      if (user) {
        //if user exists
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        //model for new instance or user
        const newUser = new User({
          name,
          email,
          password
        });

        //hash password //need to generate salt to create a hash
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            //set password to hashed
            newUser.password = hash;

            //save new user to database
            newUser
              .save()
              .then(user => {
                //flash messages before redirect
                req.flash("success_msg", "You are now registered");
                res.redirect("login");
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }
});

//login handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard", //redirect to warehouse
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

//Logout handle
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
