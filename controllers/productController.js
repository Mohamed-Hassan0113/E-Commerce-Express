const product = require("../models/Product");

exports.listProduct = async (req, res) => {
   const { productName, description, price } = req.body;
   try {
      const existingProduct = await product.findOne({ productName });
      if (existingProduct) {
         return res.status(403).json({
            status: "denied",
            message: "product with the same name already exists",
         });
      } else {
         const newProduct = new product({
            productName,
            description,
            price,
         });
         newProduct.save();
         res.status(200).json({ status: "ok", message: "product listed." });
      }
   } catch (error) {
      console.error("Error registering product:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

exports.getProductInfo = async (req, res) => {
   // return product info
};

exports.updateProduct = async (req, res) => {
   // update product in DB
};
