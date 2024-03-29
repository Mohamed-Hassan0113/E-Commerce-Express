const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

async function isLogged(req, res, next) {
   const token = req.cookies.jwt;
   try {
      if (!token) {
         return res.status(402).json({
            status: "denied",
            message: "user not logged in.",
         });
      }

      const userID = jwt.verify(token, JWT_SECRET).id;

      if (!userID) {
         return res.status(402).json({
            status: "denied",
            message: "invalid token provided",
         });
      }

      req.userID = userID;
      next();
   } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Internal server error" });
   }
}

module.exports = isLogged;
