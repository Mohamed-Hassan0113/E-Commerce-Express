const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.loginUser);
router.post("/forgotPassword", authController.forgotPassword);
router.put("/resetPassword/query?:token", authController.resetPassword);

module.exports = router;
