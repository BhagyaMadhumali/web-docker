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

// ---------------- Get all jobs (For Job Seekers) ----------------
// IMPORTANT: This must come BEFORE /:id route
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "fullName email")
      .sort({ createdAt: -1 });
    
    res.json({ success: true, jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------- Get employer's own jobs ----------------
// IMPORTANT: This must come BEFORE /:id route
router.get("/myjobs", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ success: false, message: "Only employers allowed" });
    }

    const jobs = await Job.find({ postedBy: req.user._id })
      .populate("postedBy", "fullName email")
      .sort({ createdAt: -1 });
    
    res.json({ success: true, jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------- Post new job (Employer Only) ----------------
router.post("/", authenticate, upload.single("attachment"), async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ success: false, message: "Only employers can post jobs" });
    }

    const jobData = { 
      ...req.body, 
      postedBy: req.user._id 
    };
    
    if (req.file) {
      jobData.attachment = req.file.filename;
    }

    const job = new Job(jobData);
    await job.save();

    // Populate the employer info before sending response
    await job.populate("postedBy", "fullName email");

    res.status(201).json({ success: true, job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// ---------------- Get single job by ID ----------------
// IMPORTANT: This must come AFTER /myjobs route
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "fullName email");
    
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    
    res.json({ success: true, job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------- Update job (Employer Only) ----------------
router.put("/:id", authenticate, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this job" });
    }

    Object.assign(job, req.body);
    await job.save();
    await job.populate("postedBy", "fullName email");
    
    res.json({ success: true, job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------- Delete job (Employer Only) ----------------
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this job" });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;