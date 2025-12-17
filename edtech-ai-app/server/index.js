// server/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Course = require('./models/Course'); // Import the model we just created

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // CRITICAL: Allows React (localhost:5173) to talk to this Server (localhost:5000)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Server connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

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