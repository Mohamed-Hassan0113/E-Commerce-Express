const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const isLogged = require("../middlewares/isLoggedMiddleware");

router.post("/pay", isLogged, paymentController.initiatePayment);
router.post("/webhook", paymentController.webHook);

module.exports = router;