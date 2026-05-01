require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Database connect karo
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// --- ROUTES ---
// Auth Routes (Register aur Login ke liye)
app.use('/api/auth', require('./routes/authRoutes'));

// Product Routes (Products add aur dekhne ke liye)
app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));