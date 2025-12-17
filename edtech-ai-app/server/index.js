// server/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Course = require('./models/Course');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-me';

// Middleware (MUST be before routes)
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); // CRITICAL: Allows React (localhost:5173) to talk to this Server (localhost:5000)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Server connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// REGISTER
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    // 2. Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ status: "error", error: "User not found" });

    // Compare passwords
    if (await bcrypt.compare(password, user.password)) {
      // Create a token
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET);
      
      // Send token and ID back to frontend
      return res.json({ status: "ok", token: token, userId: user._id, username: user.username });
    }
    
    res.json({ status: "error", error: "Invalid password" });
  } catch (err) {
    res.json({ status: "error", error: "Login failed" });
  }
});

// --- API ROUTES ---

// GET: Find courses by subject (e.g., /api/courses/python)
app.get('/api/courses/:subject', async (req, res) => {
  try {
    const subject = req.params.subject.toLowerCase();
    const courses = await Course.find({ slug: subject });
    
    // If we find courses, send them back. If not, send empty array.
    res.json(courses); 
  } catch (error) {
    res.status(500).json({ error: "Server error fetching courses" });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));