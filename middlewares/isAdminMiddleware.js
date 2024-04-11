const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

async function isAdmin(req, res, next) {

   const token = req.cookies.jwt;

   if (!token) {
      res.status(401).json({
         status: "unauthorized",
         message: "user is not logged in.",
      });
   }
   const userType = jwt.verify(token, JWT_SECRET).userType;
   if (userType === "admin") {
      next();
   } else {
      res.status(401).json({
         status: "unauthorized",
         message: "user is not authorized.",
      });
   }
}

module.exports = isAdmin;
