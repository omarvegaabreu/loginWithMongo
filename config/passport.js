const LocalStrategy = require("passport-local").Strategy;
//mongoose to check database for passwords
const mongoose = require("mongoose");
//bcrypt to decrypt password
const bcrypt = require("bcryptjs");

//load user model
const User = require("../models/User");

//exporting passport
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Math user to email
      //will check in mongoose
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered"
            });
          }
          //Match password password=plain text password user.password= hashed password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
