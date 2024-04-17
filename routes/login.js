const express = require("express");
const loginController = require("./../controller/login");
const { loginValidator } = require("./../validator/login.validator");
const router = express.Router();

router
  .route("/")
  .get(loginController.login)
  .post(loginValidator(), loginController.confirm);

module.exports = router;
