const mongoose = require("mongoose");
const mongoUrl = process.env.MONGODB_URL;



// Connect to MongoDB
mongoose.connect(mongoUrl)
  .then(() => console.log("Connected to database"))
  .catch(error => console.error("Database connection error:", error));