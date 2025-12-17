// server/seed.js
require('dotenv').config();
const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB...'))
  .catch(err => console.error('❌ Connection error:', err));

// 2. Define the Schema (Must match what we plan to use in the app)
const CourseSchema = new mongoose.Schema({
  slug: String,
  title: String,
  source: String,
  author: String,
  rating: Number,
  modules: [String],
  videoIds: [String]
});

const Course = mongoose.model('Course', CourseSchema);

// 3. Your Course Data (Moved from roadmap.jsx)
const courses = [
  {
    slug: 'python',
    title: "CS50's Intro to Python",
    source: "YouTube",
    author: "freeCodeCamp.org",
    rating: 5,
    modules: ["Intro", "Functions, Variables", "Conditionals", "Loops", "Exceptions", "Libraries", "Unit Tests", "File I/O", "Regular Expressions", "OOP"],
    videoIds: ["nLRL_NcnK-4", "t5sDFvOgAbM", "5_sV_p-a_yU", "_w5n2s-3nSg", "s_Kt6i21y-8", "1x6a53-D4-I", "xv24X45so2k", "1Scm19ITt_A", "r-Alj55tW4g", "tHYi3S0OW_U"]
  },
  {
    slug: 'python',
    title: "Python for Everybody",
    source: "Coursera",
    author: "University of Michigan",
    rating: 5,
    modules: ["Getting Started", "Data Structures", "Accessing Web Data", "Databases with Python", "Capstone"],
    videoIds: []
  },
  {
    slug: 'javascript',
    title: "JS Tutorial for Beginners",
    source: "YouTube",
    author: "Mosh Hamedani",
    rating: 5,
    modules: ["Intro", "Basics", "Control Flow", "Objects", "Arrays", "Functions", "ES6"],
    videoIds: ["W6NZfCO5SIk", "hdI2bqOjy3c", "IsG4Xd6LlsM", "7PGPCjcgNCE", "vEROU2XtPR8", "N8ap4k_1QEQ", "NCwa_xi0Uuc"]
  },
  {
    slug: 'sql',
    title: "SQL for Data Science",
    source: "Coursera",
    author: "UC Davis",
    rating: 5,
    modules: ["Intro to SQL", "Data Wrangling", "SQL for Data Analysis", "Advanced SQL", "BI Tools"],
    videoIds: []
  }
];

// 4. Run the Seed Function
const seedDB = async () => {
  try {
    await Course.deleteMany({}); // Clear existing data to avoid duplicates
    await Course.insertMany(courses);
    console.log('✅ Courses successfully uploaded to MongoDB!');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  } finally {
    mongoose.connection.close(); // Close connection when done
  }
};

seedDB();