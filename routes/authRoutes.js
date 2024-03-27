const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");
const isAdmin = require("../middlewares/isAdminMiddleware");

router.post("/login-user", authController.loginUser);
router.post("/forgot-password", authController.forgotPassword);
// router.post("/isAdmin", authController.isAdmin);
router.post("/reset-password/query?:token", authController.resetPasswordPost);
router.post("/list-product", isAdmin, productController.listProduct);

module.exports = router;
