const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const isLogged = require("../middlewares/isLoggedMiddleware");

router.put("/add/:productID", isLogged, cartController.addProductToCart);
router.delete("/delete/:productID", isLogged, cartController.deleteProductfromCart);
router.get("/info", isLogged, cartController.cartInfo);

module.exports = router;
