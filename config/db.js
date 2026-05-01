const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Database se connect karne ki koshish
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Hogaya!");
  } catch (err) {
    console.error("❌ Connection Fail:", err.message);
    process.exit(1); // Agar connect na ho to server band kar do
  }
};

module.exports = connectDB;