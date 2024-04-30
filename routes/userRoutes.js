const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isLogged = require("../middlewares/isLoggedMiddleware");
const isAdmin = require("../middlewares/isAdminMiddleware");

router.post("/info", isLogged, userController.userData);
router.get("/allUser", isAdmin, userController.getAllUser);
router.delete("/delete", isLogged, userController.deleteUser);
router.get("/users", isAdmin, userController.paginatedUsers);

module.exports = router;
