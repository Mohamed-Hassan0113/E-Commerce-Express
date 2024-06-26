const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
   firstName: {
      type: String,
   },
   lastName: {
      type: String,
   },
   email: {
      type: String,
   },
   password: {
      type: String,
   },
   userType: {
      type: String,
   },
});

module.exports = mongoose.model("UserInfo", userSchema);
