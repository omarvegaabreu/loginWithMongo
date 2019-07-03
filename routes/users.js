const express = require("express");

const router = express.Router();

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
    errors.push({ msg: "All fields are requiered to register." });
  }
  //Check if password match
  if (password !== password2) {
    errors.push({ msg: "Your passwords do not match." });
  }
  //Password must be at least 6 characters long
  if (password.length < 6) {
    errors.push({ msg: "Password length should be at least 6 characters" });
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
    res.send("pass");
  }
});

module.exports = router;
