const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  userType: String
});

module.exports = mongoose.model("UserInfo", userSchema);
