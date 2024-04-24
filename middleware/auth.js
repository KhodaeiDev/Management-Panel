const jwt = require("jsonwebtoken");
const userModel = require("./../model/admins");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({
      message: "This api protected",
    });
  }

  try {
    const verifyToken = await jwt.verify(token, process.env.jwt_secret);
    const user = await userModel.findById(verifyToken.id).lean();

    Reflect.deleteProperty(user, "password");

    req.user = user;
    return next();
  } catch (err) {
    res.json(err);
  }
};
