const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).json({ err: "authorization header not found" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({ err: "token not found" });
    }
    const decode = jwt.verify(token, "SECRETMESSAGE");
    const user = await User.findOne({ where: { id: decode?.user?.id } });
    if (!user) {
      return res.status(400).json({ err: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ err: "Something went wrong!!" });
  }
};
const isSeller = (req, res, next) => {
  if (req.user.dataValues.isSeller) {
    next();
  } else {
    return res.status(400).json({ err: "user is not seller" });
  }
};
module.exports = { isAuthenticated, isSeller };
