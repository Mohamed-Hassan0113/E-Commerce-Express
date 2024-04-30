const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

async function isLogged(req, res, next) {
   const token = req.cookies.jwt;
   try {
      // Check if a token is provided in the cookies or not.
      if (!token) {
         return res.status(401).json({
            status: "denied",
            message: "user not logged in.",
         });
      }

      const userID = jwt.verify(token, JWT_SECRET).id;

      // Checking token validity.
      if (!userID) {
         return res.status(401).json({
            status: "denied",
            message: "invalid token provided",
         });
      }

      // Passing the userID in the req.
      req.userID = userID;
      next();
   } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Internal server error" });
   }
}

module.exports = isLogged;
