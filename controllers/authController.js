const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/User");

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
exports.register = async (req, res) => {
   const { firstName, lastName, email, password, confirmPassword, userType } =
      req.body;

   try {
      // Check if passwords provided don't match
      req.check("password", "Passwords don't match").equals(confirmPassword);
      if (req.validationErrors()) {
         const errors = req.validationErrors();
         return res.status(400).json({ errors });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(409).json({ error: "User already exists" });
      }

      // Hash the password after generating the Salt
      const salt = await bcrypt.genSalt();

      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new User({
         firstName,
         lastName,
         email,
         password: hashedPassword,
         userType,
      });

      // Save the user to the database
      await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
         { email: newUser.email, id: newUser._id },
         JWT_SECRET,
         {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_AT,
         }
      );

      // Return success response with token
      res.status(201).json({ status: "ok", data: token });
   } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

exports.loginUser = async (req, res) => {
   const { email, password } = req.body;

   try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check if the password is correct
      const isPasswordValid = bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
         { id: user._id, userType: user.userType },
         JWT_SECRET,
         {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_AT,
         }
      );

      // Return success response with token and a cookie with the token.
      res.cookie("jwt", token, {
         httpOnly: true,
         maxAge: 1000 * 60 * 60 * 3,
      });

      res.status(200).json({ data: token });
   } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

exports.forgotPassword = async (req, res) => {
   const { email } = req.body;

   try {
      // check if the email exists
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({ error: "user doesn't exist" });
      }

      // send email
      const transporter = nodeMailer.createTransport({
         host: "smtp.gmail.com",
         port: 587,
         secure: false,
         auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
         },
      });

      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
         expiresIn: 60 * 3,
      });

      const mailOptions = {
         from: `${process.env.GMAIL_EMAIL}`,
         to: email,
         subject: "Your password reset request",
         text: `We have received a request to reset the password of the
                 account attached to the email address ${email}.
                 kindly follow the link below: localhost:3000/auth/resetPassword/query?token=${token}`,
      };
      await transporter.sendMail(mailOptions);

      console.log("Email sent to: ", email);
      res.status(200).json({ status: "ok", data: "email sent" });
   } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};

exports.resetPassword = async (req, res) => {
   const newPassword = req.body.newPassword;

   const token = req.query.token;
   const id = jwt.verify(token, JWT_SECRET).id;

   try {
      const user = await User.findOne({ _id: id });
      if (!user) {
         return res.status(404).json({
            status: "not found",
            message: "User not found",
         });
      }

      const salt = await bcrypt.genSalt();
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedNewPassword;
      user.save();

      res.status(200).json({
         status: "ok",
         message: "password changed successfully",
      });
   } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};
