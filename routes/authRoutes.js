const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login-user", authController.loginUser);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/query?:token", authController.resetPasswordPost);

module.exports = router;
