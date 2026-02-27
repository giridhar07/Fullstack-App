const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists with this email' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully',user:newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) return res.status(401).json({ msg: "Invalid login" });

//   const valid = await bcrypt.compare(password, user.password);

//   if (!valid) return res.status(401).json({ msg: "Invalid login" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//   res.json({ token });
// };

async function login(req, res) {
  try {
    const email = String(req.body?.email || "").trim();
    const inputPassword = String(req.body?.password || "").trim();

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email' });

    // Check password: support bcrypt hashes and legacy plain-text records.
    const storedPassword = String(user.password || user.passwordHash || "");
    let valid = false;
    if (storedPassword.startsWith("$2")) {
      valid = await bcrypt.compare(inputPassword, storedPassword);
    } else {
      valid = inputPassword === storedPassword.trim();
      // Upgrade legacy plain-text password to bcrypt hash after successful login.
      if (valid) {
        user.password = await bcrypt.hash(inputPassword, 10);
        await user.save();
      }
    }
    if (!valid) return res.status(401).json({ message: 'Invalid Password' });

   // const token = jwt.sign({ id: user._id }, JWT_SECRET);

    //res.json({ token });
    //Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ token, userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


 const logoutUser = async (req, res) => {
  try {
    const isProd = process.env.NODE_ENV === "production";
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });
    return res
      .status(200)
      .json({messege:"User logged out successfully"});
  } catch (error) {
     return res.status(500).json({ error: error.message });
  }
}

 async function getProfile(req, res) {
  try {
   
    const userId = req.userId
      
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { signup, login, logoutUser, getProfile };
