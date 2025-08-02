const mongoose = require("mongoose");

 const connectDB =(url)=>{
  return mongoose.connect(url)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((error) => {
    console.log("❌ MongoDB connection error:", error);
  });
 }
 module.exports = connectDB
