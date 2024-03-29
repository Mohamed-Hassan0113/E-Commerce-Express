const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
   userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInfo",
   },
   products: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "productInfo",
      },
   ],
   totalPrice: {
      type: Number,
      default: 0,
   },
});

module.exports = mongoose.model("cartInfo", cartSchema);
