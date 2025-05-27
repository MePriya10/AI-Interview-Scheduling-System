const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { register, login, getProfile, updateProfile } = require('../controllers/authController'); // assuming you export those from somewhere


const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token", error: err.message });
  }
};


module.exports = {
  register,
  login,
  getProfile,
  authenticateToken,
  updateProfile,
};
