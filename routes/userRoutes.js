const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/userData", userController.userData);
router.get("/getAllUser", userController.getAllUser);
router.post("/deleteUser", userController.deleteUser);
router.get("/paginatedUsers", userController.paginatedUsers);

module.exports = router;
