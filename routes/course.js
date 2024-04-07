const express = require("express");
const courseController = require("./../controller/course");

const router = express.Router();

router.route("/").get(courseController.getAll).post(courseController.create);
router.route("/remove/:id").get(courseController.remove);
router.route("/edit/:id").get(courseController.edit);

module.exports = router;
