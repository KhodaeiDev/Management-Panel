const express = require("express");
const courseController = require("./../controller/course");
const { courseValidator } = require("./../validator/courses.validator");
const authMiddleware = require("./../middleware/auth");
const isAdminMiddleware = require("./../middleware/isAdmin");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, courseController.getAll);
router
  .route("/")
  .post(
    courseValidator(),
    authMiddleware,
    isAdminMiddleware,
    courseController.create
  );
router
  .route("/remove/:id")
  .get(authMiddleware, isAdminMiddleware, courseController.remove);
router
  .route("/edit/:id")
  .get(authMiddleware, isAdminMiddleware, courseController.edit);

module.exports = router;
