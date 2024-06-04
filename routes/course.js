const express = require("express");
const courseController = require("./../controller/course");
const { courseValidator } = require("./../validator/courses.validator");
const authMiddleware = require("./../middleware/auth");
const isAdminMiddleware = require("./../middleware/isAdmin");
const { multerStorage } = require("../middleware/uoloader");

const router = express.Router();

const uploader = multerStorage("/courses");

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, courseController.getAll);

router
  .route("/")
  .post(
    uploader.single("image"),
    courseValidator(),
    authMiddleware,
    isAdminMiddleware,
    courseController.create
  );
router
  .route("/remove/:id")
  .get(authMiddleware, isAdminMiddleware, courseController.remove);
router
  .route("/edit/:courseID")
  .post(authMiddleware, isAdminMiddleware, courseController.edit);

module.exports = router;
