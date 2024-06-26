const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addProductToCart = async (req, res) => {
   try {

      const userID = req.userID;
      
      const productID = req.params.productID;
      const product = await Product.findById(productID);
      // Check if product doesn't exist
      if (!product) {
         return res
            .status(404)
            .json({ message: "product isn't listed" });
      }

      let userCart = await Cart.findOne({ userID });
      // Check if a cart was created to the user or not
      if (!userCart) {
         userCart = await Cart.create({
            userID,
            products: [],
         });
      }
      
      // Cart's total price calculations
      let productPrice = product.price;
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
      if (!userCart) {
         return res
         .status(404)
         .json({ status: "not found", message: "cart not found." });
      }
      
      let totalPrice = userCart.totalPrice;
      
      // Check if product is included in the User's cart or not.
      if (!userCart.products.includes(productID)) {
         return res.status(404).json({
            status: "not found",
            message: "product not found in cart.",
         });
      }
      
      // Delete one instance of the product from the cart
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
