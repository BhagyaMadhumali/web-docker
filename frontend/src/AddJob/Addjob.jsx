import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Employersidebar from "../employersidebar/employersidebar";
import Employerheader from "../employerheader/employerheader";
import "./Addjob.css";

const Addjob = ({ employerData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingJob = location.state?.job;

  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    category: "",
    jobType: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",
  });

  useEffect(() => {
    if (editingJob) {
      setJobData({
        title: editingJob.title,
        location: editingJob.location,
        category: editingJob.category,
        jobType: editingJob.jobType,
        description: editingJob.description,
        requirements: editingJob.requirements,
        salaryMin: editingJob.salaryMin,
        salaryMax: editingJob.salaryMax,
      });
    }
  }, [editingJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (editingJob) {
        // Update job
        await axios.put(`http://localhost:4000/api/jobs/${editingJob._id}`, jobData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ Job updated successfully!");
      } else {
        // Post new job
        await axios.post("http://localhost:4000/api/jobs", jobData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ Job posted successfully!");
      }

      navigate("/managejob"); // redirect back to job list
    } catch (err) {
      console.error(err);
      alert("⚠️ Error posting/updating job.");
    }
  };

  return (
    <div className="dashboard-container">
      <Employersidebar />
      <div className="main-content">
        <Employerheader employerData={employerData} />
        <div className="addjob-container">
          <button className="cancel-btn" onClick={() => navigate("/managejob")}>
            ✖ Cancel
          </button>
          <h2>{editingJob ? "Update Job" : "Post a New Job"}</h2>
          <form onSubmit={handleSubmit} className="addjob-form">
            <label>Job Title</label>
            <input type="text" name="title" value={jobData.title} onChange={handleChange} required />

            <label>Location</label>
            <input type="text" name="location" value={jobData.location} onChange={handleChange} required />

            <label>Category</label>
            <input type="text" name="category" value={jobData.category} onChange={handleChange} required />

            <label>Job Type</label>
            <select name="jobType" value={jobData.jobType} onChange={handleChange} required>
              <option value="">Select Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>

            <label>Job Description</label>
            <textarea name="description" value={jobData.description} onChange={handleChange} rows="5" required />

            <label>Requirements</label>
            <textarea name="requirements" value={jobData.requirements} onChange={handleChange} rows="5" required />

            <label>Salary Range</label>
            <div className="salary-range">
              <input type="number" name="salaryMin" value={jobData.salaryMin} onChange={handleChange} placeholder="Min Salary" required />
              <span>to</span>
              <input type="number" name="salaryMax" value={jobData.salaryMax} onChange={handleChange} placeholder="Max Salary" required />
            </div>

            <button type="submit" className="submit-btn">
              {editingJob ? "Update Job" : "Post Job"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addjob;
