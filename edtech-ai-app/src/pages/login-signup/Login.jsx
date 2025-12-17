import './Auth.css';

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