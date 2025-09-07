const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Admin credentials from .env
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Register (Student)
router.post('/register', async (req, res) => {
  try {
    const { name, regNo, branch, email, password } = req.body;

    if (!name || !regNo || !branch || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email pattern
    const emailRegex = /^[^@\s]+@sliet\.ac\.in$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email must be a sliet.ac.in address' });
    }

    // Check for existing users
    const existing = await User.findOne({ $or: [{ email }, { regNo }] });
    if (existing) {
      return res.status(400).json({ message: 'User with email or regNo already exists' });
    }

    // Hash password
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const user = new User({ name, regNo, branch, email, password: hashedPassword });


    await user.save(); // ← This line was failing before

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Registration Error:', err); // See full error in terminal
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Login (Student & Admin)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Admin login check
    if (email === ADMIN_EMAIL) {
      if (password === ADMIN_PASSWORD) {
        const token = jwt.sign({ userId: 'admin', role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        return res.json({ token, email: ADMIN_EMAIL, name: 'Admin', role: 'admin' });
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }
    // Student login
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, role: 'student' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token, email: user.email, name: user.name, role: 'student' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 