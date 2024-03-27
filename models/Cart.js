const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
   userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
   },
   totalPrice: Number,
});

module.exports = mongoose.model("cartInfo", cartSchema);
