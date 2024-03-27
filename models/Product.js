const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: String,
  description: String,
  price: Number
});

module.exports = mongoose.model("productInfo", productSchema);
