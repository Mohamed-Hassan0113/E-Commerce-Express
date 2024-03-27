const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isLogged = require("../middlewares/isLoggedMiddleware");
const isAdmin = require("../middlewares/isAdminMiddleware");

router.post("/userData", isLogged, userController.userData);
router.get("/getAllUser", isAdmin, userController.getAllUser);
router.post("/deleteUser", isLogged, userController.deleteUser);
router.get("/paginatedUsers", isAdmin, userController.paginatedUsers);

module.exports = router;
