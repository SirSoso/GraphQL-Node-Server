const jwt = require("jsonwebtoken");
const User = require("../models/User");

const context = async ({ req }) => {
  const token = req.headers.authorization;
  if (!token) return {};

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  return { user };
};

module.exports = {
  context,
};
