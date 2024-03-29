const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const productController = require("../controllers/productController");
const isLogged = require("../middlewares/isLoggedMiddleware");

router.post("/addToCart/:productID", isLogged, cartController.addProductToCart);
router.post("/deleteFromCart/:productID", isLogged, cartController.deleteProductfromCart);
router.get("/getCartInfo", isLogged, cartController.cartInfo);

module.exports = router;
