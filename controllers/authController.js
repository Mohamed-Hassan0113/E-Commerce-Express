const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodeMailer = require("nodemailer");
const cookie = require("cookie-parser");
const dotenv = require('dotenv')
dotenv.config();

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
// const JWT_SECRET = "this is a secret";

exports.register = async (req, res) => {
  const { fname, lname, email, password, confirmPassword, userType } = req.body;

  try {

    req.check('password', "Passwords don't match").equals(confirmPassword);

    if(req.validationErrors()){
      res.send(req.validationErrors());
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password after generating the Salt
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
      userType,
    });

    // Save the user to the database
    await newUser.save();

    console.log("New user saved.");

    console.log(JWT_SECRET);
    // Generate JWT token
    const token = jwt.sign({ email: newUser.email ,id:newUser._id}, JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_AT
    });

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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id : user._id, userType: user.userType }, JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_AT
    });

    // Return success response with token and a cookie with the token.
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 3
    });

    res.status(200).json({ status: "ok", data: token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try{
      // check if the email exists
      const user = await User.findOne({ email });
      if(!user) {
        return res.status(401).json({ error: "user doesn't exist"});
      }

      // send email
      const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "lolos.hassan0@gmail.com",
          pass: "keau wzvi uccp faky"
        }
      });

      const token = await jwt.sign({id: user._id}, JWT_SECRET, {
        expiresIn: 60 * 3
      });

        const mailOptions = {
          from: 'lolos.hassan0@gmail.com',
          to: email,
          subject: 'Your password reset request',
          text: `We have received a request to reset the password of the
                 account attached to the email address ${email}.
                 kindly follow the link below: localhost:3000/auth/reset-password/query?token=${token}`
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent to: ', email);
        res.status(200).json({ status: "ok", data:  "email sent"});


    } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Internal server error" });
    };
};

exports.resetPasswordPost = async (req, res) => {
  
    const token = req.query.token;
    const newPassword = req.body.newPassword;
    const id = jwt.verify(token, JWT_SECRET).id;

    console.log(id);

    try{

      const user = await User.findOne({ _id: id });
      
      if(!user){
        console.log('invalid token verified');
        res.status(401).json({status: "unauthorized", message: "couldn't verify token"});
      }
      
      // console.log('user found!');

      // const salt = await bcrypt.genSalt();
      // const hashedNewPassword = await bcrypt.hash(newPassword, salt);

      const salt = await bcrypt.genSalt();
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      
      user.password = hashedNewPassword;

      user.save();
      
      res.status(200).json({status: "ok", message: "password changed successfully"});

    } catch(error){
      console.error("Error changing password:", error);
      res.status(500).json({ error: "Internal server error" });
    }

//  exports.isAdmin = async (req, res, next) => {
//       const token = req.cookies.jwt;

//       if(!token){
//         res.status(401).json({status: "unauthorized", message: "user is not logged in."})
//       }
//       const userID = jwt.verify(token, JWT_SECRET).id;
//       const user = User.findOne({ userID });
//       if(user.userType === "admin"){
//         next();
//       } else{
//         res.status(401).json({status: "unauthorized", message: "user is not logged in."})
//       }
//     }
};