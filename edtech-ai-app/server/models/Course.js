// server/models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  slug: String,         // e.g., 'python'
  title: String,
  source: String,
  author: String,
  rating: Number,
  modules: [String],
  videoIds: [String]
});

module.exports = mongoose.model('Course', CourseSchema);