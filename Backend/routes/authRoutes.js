const express = require("express");
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken');
const { register, login, getProfile, updateProfile } = require("../controllers/authController");

router.post("/signup", register);
router.post("/login", login);
router.get("/profile", authenticateToken, getProfile);  // ✅ Fixed
router.put("/profile", authenticateToken, updateProfile);
module.exports = router;
