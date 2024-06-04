const { body } = require("express-validator");

const courseValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Course name is a required Field")
      .isLength({ min: 3, max: 45 })
      .withMessage(
        "Course title cannot be less than 3 and more than 45 characters"
      ),
  ];
};

module.exports = { courseValidator };
