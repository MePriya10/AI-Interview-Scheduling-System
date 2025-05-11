const User = require('../models/User'); // adjust path if needed
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔐 Register new user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to DB
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Return token and user (without password)
    const { password: _, ...userData } = newUser._doc;
    res.status(201).json({ token, user: userData });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// 🔓 Login existing user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Return token and user (omit password)
    const { password: _, ...userData } = user._doc;
    res.status(200).json({ token, user: userData });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { register, login };





