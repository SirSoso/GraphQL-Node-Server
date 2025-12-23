const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
  last_name: String,
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
});

module.exports = mongoose.model("User", UserSchema);
