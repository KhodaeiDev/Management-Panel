const jwt = require("jsonwebtoken");
const userModel = require("./../models/user");

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization")?.split(" ");
  if (!authHeader) {
    return res.status(403).json({
      message: "This api protected",
    });
  }

  const token = authHeader[1];

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
