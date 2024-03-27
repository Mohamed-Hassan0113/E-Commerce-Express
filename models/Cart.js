const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userID: String,
    products: [{
        productName: String,
        description: String,
        price: Number
    }],
    numberOfProducts: Number,
    totalPrice: Number
});

module.exports = mongoose.model("Carts", cartSchema);
