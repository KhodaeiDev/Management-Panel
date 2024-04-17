const { body } = require("express-validator");

const loginValidator = () => {
  return [
    body("username").notEmpty().withMessage("لطفا نام کاربری را وارد کنید"),
    body("password").notEmpty().withMessage("لطفا رمز عبود خود را وارد کنید"),
  ];
};

module.exports = { loginValidator };
