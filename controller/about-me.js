const jwt = require("jsonwebtoken");
const asminsModel = require("./../model/admins");

exports.get = async (req, res) => {
  const decoded = await jwt.verify(req.cookies.token, process.env.jwt_secret);
  //   const user = await userModel.findOne({ _id: decoded.id });
  return res.render("about-me");
};
