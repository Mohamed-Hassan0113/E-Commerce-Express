const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const isAdmin = require("../middlewares/isAdminMiddleware");

router.post("/list", isAdmin, productController.listProduct);
router.get("/Info", productController.getProductInfo);
router.put("/update/:productID", isAdmin, productController.updateProduct);

module.exports = router;
