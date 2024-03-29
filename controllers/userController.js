const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

exports.userData = async (req, res) => {
   try {
      const userID = req.userID;
      const user = await User.findById(userID).select("-password");
      res.status(200).json(user);
   } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

exports.getAllUser = async (req, res) => {
   try {
      const users = await User.find().exec();
      res.status(200).json({ data: users });
   } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

exports.deleteUser = async (req, res) => {
   const userID = req.userID;
   console.log(userID);
   try {
      await User.findOneAndDelete({ _id: userID });
      res.status(200).json({
         status: "done",
         message: "user deleted successfully.",
      });
   } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

exports.paginatedUsers = async (req, res) => {
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;
   try {
      const users = await User.find()
         .skip((page - 1) * limit)
         .limit(limit)
         .exec();
      res.status(200).json(users);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "internal server error" });
   }
};
