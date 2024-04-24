const express = require("express");
const aboutController = require("./../controller/about-me");
const authMiddleware = require("./../middleware/auth");
const isAdminMiddleware = require("./../middleware/isAdmin");

const router = express.Router();

router.route("/").get(authMiddleware, isAdminMiddleware, aboutController.get);

module.exports = router;
