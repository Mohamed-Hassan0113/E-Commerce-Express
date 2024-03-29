const Product = require("../models/Product");

exports.listProduct = async (req, res) => {
   const { productName, description, price } = req.body;
   try {
      const existingProduct = await Product.findOne({ productName });
      if (existingProduct) {
         return res.status(403).json({
            status: "denied",
            message: "product with the same name already exists",
         });
      } else {
         const newProduct = new Product({
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
   try {
      const productID = req.params.productID;
      const product = (await Product.findById(productID)) || null;
      if (!product) {
         return res.status(404).json({
            status: "product not found",
            message: "error retrieving product information",
         });
      }
      res.status(200).json(product);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
   }
};

exports.updateProduct = async (req, res) => {
   try {
      const { productName, description, price } = req.body;
      const productID = req.params.productID;
      const product = (await Product.findById(productID)) || null;
      if (!product) {
         return res.status(404).json({
            status: "procuct not found",
            message: "error retrieving product information",
         });
      }
      await Product.updateOne(
         { _id: productID },
         { productName, description, price }
      );
      res.status(200).json({
         status: "ok",
         message: "product updated successfully",
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
   }
};
