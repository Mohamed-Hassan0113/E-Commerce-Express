const mongoose = require("mongoose");
const mongoUrl = "mongodb://127.0.0.1:27017/local";



// Connect to MongoDB
mongoose.connect(mongoUrl)
  .then(() => console.log("Connected to database"))
  .catch(error => console.error("Database connection error:", error));