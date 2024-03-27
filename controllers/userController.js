const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

exports.userData = async (req, res) => {
   const token = req.cookies.jwt;
   const userID = jwt.verify(token, JWT_SECRET).id;
   const user = await User.findById(userID).select("-password");

   if (!user) {
      return res
         .status(404)
         .json({ status: "not found", message: "user not found." });
   }

   res.status(200).json(user);
};

exports.getAllUser = async (req, res) => {
   // Fetch all users
};

exports.deleteUser = async (req, res) => {
   // Delete a user
};

exports.paginatedUsers = async (req, res) => {
   // Fetch users with pagination
};
