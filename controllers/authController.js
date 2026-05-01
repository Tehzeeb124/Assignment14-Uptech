const User = require('../models/User'); // User model ko import kiya
const bcrypt = require('bcryptjs');     // Password lock karne ke liye
const jwt = require('jsonwebtoken');    // Digital chabi (token) banane ke liye

// --- REGISTER LOGIC ---
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check karo user pehle se to nahi bana hua
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User pehle se maujood hai!" });
    }

    // 2. Naya user banao
    user = new User({ name, email, password });

    // 3. Password ko hash (encrypt) karo
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Database mein save karo
    await user.save();

    res.status(201).json({ msg: "Mubarak ho! Registeration kamyab rahi." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error: Registration mein masla aaya.");
  }
};

// --- LOGIN LOGIC ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check karo user database mein hai?
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Email galat hai ya user nahi mila." });
    }

    // 2. Password match karo (jo user ne likha vs jo database mein hai)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password sahi nahi hai." });
    }

    // 3. Agar sab sahi hai, to Token (JWT) banao
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } // Token 1 ghante baad expire ho jayega
    );

    // 4. Token aur user details wapis bhejo
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error: Login mein masla aaya.");
  }
};