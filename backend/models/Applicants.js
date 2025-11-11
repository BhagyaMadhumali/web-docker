const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Job info (auto-filled)
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  jobTitle: { type: String, required: true },
  jobCategory: { type: String, required: true },
  jobType: { type: String, required: true },
  jobLocation: { type: String, required: true },
  jobSalaryMin: { type: Number },
  jobSalaryMax: { type: Number },

  // Personal CV info
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  sex: { type: String },
  address: { type: String },
  education: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: String, required: true },
  coverLetter: { type: String },


  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Applicants", applicantSchema);
