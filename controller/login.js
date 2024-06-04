const adminModel = require("./../model/admins");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const courseModel = require("./../model/course");
const { validationResult } = require("express-validator");

exports.login = async (req, res) => {
  return res.render("login");
};

exports.confirm = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      req.flash("error", result.errors[0].msg);
      return res.redirect("/");
    }

    const user = await adminModel.findOne({ username });

    if (!user) {
      req.flash("error", "The username or password is invalid");
      return res.redirect("/");
    }

    const confirmPassword = await bcrypt.compare(password, user.password);
    if (!confirmPassword) {
      req.flash("error", "The username or password is invalid");
      return res.redirect("/");
    } else {
      const courses = await courseModel.find({});
      const acsessToken = await jwt.sign(
        { id: user._id },
        process.env.jwt_secret,
        {
          expiresIn: "30day",
        }
      );

      res.cookie("token", acsessToken, {
        maxAge: 1200000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      req.flash("success", "Your Login Successfully");
      return res.render("course", {
        courses,
      });
    }
  } catch (err) {
    next(err);
  }
};
