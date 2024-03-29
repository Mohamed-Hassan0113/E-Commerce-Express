const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { create } = require("../models/User");

exports.addProductToCart = async (req, res) => {
   try {
      const userID = req.userID;
      const productID = req.params.productID;
      const product = await Product.findById(productID);
      if (!product) {
         return res
            .status(404)
            .json({ status: "not found", message: "product isn't listed" });
      }
      let productPrice = product.price;
      let userCart = await Cart.findOne({ userID });
      //   console.log(userCart);
      if (!userCart) {
         userCart = await Cart.create({
            userID,
            products: [],
         });
      }
      userCart.products.push(productID);
      userCart.totalPrice += productPrice;
      userCart.save();
      res.status(200).json({
         status: " ok",
         message: "product added to cart successfully.",
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
   }
};

exports.deleteProductfromCart = async (req, res) => {
   try {
      const userID = req.userID;
      const productID = req.params.productID;
      const product = await Product.findById(productID);
      let productPrice = product.price;
      const userCart = await Cart.findOne({ userID });
      let totalPrice = userCart.totalPrice;
      if (!userCart) {
         return res
            .status(404)
            .json({ status: "not found", message: "cart not found." });
      }
      if (!userCart.products.includes(productID)) {
         return res.status(404).json({
            status: "not found",
            message: "product not found in cart.",
         });
      }
      for (const index in userCart.products) {
         if (userCart.products[index].toString() === productID) {
            userCart.products = userCart.products.filter(
               (id, idx) => idx != index
            );
            break;
         }
      }
      totalPrice -= productPrice;
      await Cart.updateOne(
         { userID },
         {
            products: userCart.products,
            totalPrice,
         }
      );
      res.status(200).json({
         status: "ok",
         message: "product deleted successfully.",
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
   }
};

exports.cartInfo = async (req, res) => {
   try {
      const userID = req.userID;
      const userCart = await Cart.findOne({ userID });
      if (!userCart) {
         return res
            .status(404)
            .json({ status: "not found", message: "cart not found." });
      }
      const cartItems = await Cart.findOne({ userID })
         .populate("products")
         .exec();
      res.status(200).json({ status: "ok", data: cartItems });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
   }
};
