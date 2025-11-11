const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Applicant = require("../models/Applicants");
const User = require("../models/User");

// JWT authentication middleware
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ success: false, message: "Invalid user" });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ success: false, message: "Unauthorized" });
  }
};

// POST: Submit CV/Application
router.post("/", authenticate, async (req, res) => {
  try {
    const applicantData = { ...req.body, user: req.user._id };
    const applicant = new Applicant(applicantData);
    await applicant.save();
    res.status(201).json({ success: true, applicant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET: User's applications
router.get("/my-applications", authenticate, async (req, res) => {
  try {
    const applications = await Applicant.find({ user: req.user._id }).populate("jobId", "title category jobType location salaryMin salaryMax");
    res.json({ success: true, applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
