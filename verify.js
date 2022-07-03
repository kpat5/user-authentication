const { check } = require("express-validator");
const validate = require("express-validator");

const signUp = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Enter a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password must be more then 6 characters").isLength({
    min: 6,
  }),
];
const login = [
  check("email", "Enter a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password must be more then 6 characters").isLength({
    min: 6,
  }),
];

module.exports = { signUp, login };
