const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const Job = require("../models/Job");
const User = require("../models/User");

// ---------------- File upload setup ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ---------------- JWT Authentication ----------------
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

// ---------------- Post new job ----------------
router.post("/", authenticate, upload.single("attachment"), async (req, res) => {
  try {
    if (req.user.role !== "employer") return res.status(403).json({ success: false, message: "Only employers can post jobs" });
    const jobData = { ...req.body, postedBy: req.user._id };
    if (req.file) jobData.attachment = req.file.filename;
    const job = new Job(jobData);
    await job.save();
    res.status(201).json({ success: true, job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------- Get all jobs ----------------
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "fullName email").sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------- Get employer's jobs ----------------
router.get("/myjobs", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "employer") return res.status(403).json({ success: false, message: "Only employers allowed" });
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------- Get single job ----------------
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "fullName email");
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------- Update job ----------------
router.put("/:id", authenticate, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    if (job.postedBy.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: "Not allowed" });

    Object.assign(job, req.body); // update job fields
    await job.save();
    res.json({ success: true, job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE: Delete an application by ID
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const application = await Applicant.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, // ensure user can only delete their own application
    });

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found or not authorized" });
    }

    res.json({ success: true, message: "Application deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
