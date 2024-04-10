const adminModel = require("./../model/admins");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    if (username === "" || password === "") {
      return res.render("login", {
        message: "لطفا نام کاربری و رمز عبور را وارد کنید",
      });
    }

    const user = await adminModel.findOne({ username });

    if (!user) {
      return res.render("login", {
        message: "کاربری با این نام کاربری پیدا نشد",
      });
    }

    const confirmPassword = await bcrypt.compare(password, user.password);
    if (!confirmPassword) {
      return res.render("login", { message: "رمز شما نادرست است" });
    } else {
      const acsessToken = await jwt.sign(
        { id: user._id },
        process.env.jwt_secret,
        {
          expiresIn: "30day",
        }
      );

      res.cookie("jwt", acsessToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      });
      return res.render("main");
    }
  } catch {
    return res
      .status(500)
      .json({ message: "Ooops !!! Unknown Server Error :( " });
  }
};
