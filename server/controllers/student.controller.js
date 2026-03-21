import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utilities/token_gen.utility.js";
import { isDbReady } from "../database/connect.database.js";

// Helper – return a clean, user-friendly message for known error patterns
const friendlyError = (raw) => {
  if (!raw) return "An unexpected error occurred. Please try again.";
  const msg = raw.toLowerCase();
  if (msg.includes("buffering timed out") || msg.includes("econnrefused") || msg.includes("connection"))
    return "Database connection issue. Please try again in a moment.";
  if (msg.includes("duplicate key") || msg.includes("e11000"))
    return "An account with this email already exists.";
  return "Server error. Please try again.";
};

// @desc    Register a new student
// @route   POST /api/students/register
// @access  Public
export const registerStudent = async (req, res) => {
  // Guard: skip DB call if not connected
  if (!isDbReady()) {
    return res.status(503).json({ message: "Database connection issue. Please try again in a moment." });
  }

  try {
    const { name, email, password } = req.body;

    // Field validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters." });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const studentExists = await Student.findOne({ email: email.toLowerCase() });

    if (studentExists) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = await Student.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      number: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    });

    if (student) {
      return res.status(201).json({
        _id: student._id,
        name: student.name,
        email: student.email,
        token: generateToken(student._id, "30d"),
        message: "Account created successfully!",
      });
    }

    return res.status(400).json({ message: "Failed to create account. Please try again." });
  } catch (error) {
    console.error("registerStudent error:", error.message);
    return res.status(500).json({ message: friendlyError(error.message) });
  }
};

// @desc    Authenticate a student & get token
// @route   POST /api/students/login
// @access  Public
export const loginStudent = async (req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({ message: "Database connection issue. Please try again in a moment." });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter your email and password." });
    }

    const student = await Student.findOne({ email: email.toLowerCase() }).select("+password");

    if (!student) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      token: generateToken(student._id, "30d"),
      message: "Login successful!",
    });
  } catch (error) {
    console.error("loginStudent error:", error.message);
    return res.status(500).json({ message: friendlyError(error.message) });
  }
};

// @desc    Get current student data
// @route   GET /api/students/me
// @access  Private
export const getMe = async (req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({ message: "Database connection issue. Please try again." });
  }

  try {
    const student = await Student.findById(req.user._id);

    if (student) {
      return res.json({
        _id: student._id,
        name: student.name,
        email: student.email,
        number: student.number,
      });
    }

    return res.status(404).json({ message: "User not found." });
  } catch (error) {
    console.error("getMe error:", error.message);
    return res.status(500).json({ message: friendlyError(error.message) });
  }
};
