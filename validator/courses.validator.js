const { body } = require("express-validator");

const courseValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("نام دوره نمیتواند خالی باشد")
      .isLength({ min: 3, max: 25 })
      .withMessage("عنوان دوره نمیتواند کمتر از 3 و بیشتر از 25 کاراکتر باشد"),
  ];
};

module.exports = { courseValidator };
