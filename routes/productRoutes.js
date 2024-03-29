const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const isAdmin = require("../middlewares/isAdminMiddleware");

router.post("/list-product", isAdmin, productController.listProduct);
router.get("/getProductInfo", productController.getProductInfo);
router.post(
   "/updateProduct/:productID",
   isAdmin,
   productController.updateProduct
);

module.exports = router;
