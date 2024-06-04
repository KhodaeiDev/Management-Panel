const { body } = require("express-validator");

const loginValidator = () => {
  return [
    body("username").notEmpty().withMessage("Please enter username"),
    body("password").notEmpty().withMessage("Please enter your password"),
  ];
};

module.exports = { loginValidator };
