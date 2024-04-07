const express = require("express");
const loginController = require("./../controller/login");

const router = express.Router();

router.route("/").get(loginController.login).post(loginController.confirm);
module.exports = router;
