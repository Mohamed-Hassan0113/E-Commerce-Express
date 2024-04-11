const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cookieParser = require("cookie-parser");
const validator = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(
   express.json({
      verify: (req, res, buf) => {
         req.rawBody = buf.toString();
      },
   })
);
app.use(cookieParser());
app.use(validator());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/payment", paymentRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`);
});
