const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Frontend se Token pakro (Headers mein se)
  const authHeader = req.header('Authorization');

  // 2. Check karo agar token hai hi nahi
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, permission denied!" });
  }

  try {
    // 3. Token "Bearer <token>" format mein hota hai, usmein se asli token nikalo
    const token = authHeader.split(" ")[1];

    // 4. Token ko verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. User ka data request mein daal do taake baqi routes ko pata ho kaun login hai
    req.user = decoded;

    // 6. Agle function par jao (Success!)
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token sahi nahi hai!" });
  }
};