const router = express.Router();
const cartController = require("../controllers/cartController");
const productController = require("../controllers/productController");
const isLogged = require("../middlewares/isLoggedMiddleware");

router.post("/addToCart", isLogged, cartController.addProductToCart);
router.post("/deleteFromCart", isLogged, cartController.deleteProductFromCart);
