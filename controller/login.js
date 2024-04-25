const adminModel = require("./../model/admins");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const courseModel = require("./../model/course");
const { validationResult } = require("express-validator");

exports.login = async (req, res) => {
  try {
    return res.render("login");
  } catch {
    return res
      .status(500)
      .json({ message: "Ooops !!! Unknown Server Error :( " });
  }
};

exports.confirm = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      req.flash("error", result.errors[0].msg);
      return res.redirect("/");
    }

    const user = await adminModel.findOne({ username });

    if (!user) {
      req.flash("error", "کاربری با این نام کاربری پیدا نشد");
      return res.redirect("/");
    }

    const confirmPassword = await bcrypt.compare(password, user.password);
    if (!confirmPassword) {
      req.flash("error", "رمز شما نادرست است");
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
      return res.render("course", {
        courses,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
