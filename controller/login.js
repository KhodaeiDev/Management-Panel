const adminModel = require("./../model/admins");
const bcrypt = require("bcrypt");

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
      return res.render("main");
    }
  } catch {
    return res
      .status(500)
      .json({ message: "Ooops !!! Unknown Server Error :( " });
  }
};
