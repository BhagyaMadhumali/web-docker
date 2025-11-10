import React, { useState } from "react";
import "./employer.css";
import axios from "axios";
import Employersidebar from "../employersidebar/employersidebar";
import Employerheader from "../employerheader/employerheader";

const employerData = {
  name: "John Doe",
  role: "Employer",
  profilePic: "https://via.placeholder.com/40",
  stats: { activeJobs: 5, totalApplicants: 23, hired: 2 },
  recentJobs: [
    { title: "Frontend Developer", date: "2025-11-01" },
    { title: "Backend Engineer", date: "2025-10-28" },
    { title: "UI/UX Designer", date: "2025-10-25" },
  ],
  recentApplications: [
    { name: "Alice Smith", job: "Frontend Developer" },
    { name: "Bob Johnson", job: "Backend Engineer" },
    { name: "Carol Lee", job: "UI/UX Designer" },
  ],
};

const Employer = () => {
  const [showForm, setShowForm] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:4000/api/jobs", jobData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        alert(`✅ Job "${res.data.job.title}" posted successfully!`);
        setShowForm(false);
        setJobData({
          title: "",
          location: "",
          category: "",
          jobType: "",
          description: "",
          requirements: "",
          salaryMin: "",
          salaryMax: "",
        });
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error posting job. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <Employersidebar onPostJob={() => setShowForm(true)} />

      <div className="main-content">
        <Employerheader employerData={employerData} />

        <div className="stats-grid">
          <div className="stats-box">
            <div className="title">Active Jobs</div>
            <div className="count">{employerData.stats.activeJobs}</div>
          </div>
          <div className="stats-box">
            <div className="title">Total Applicants</div>
            <div className="count">{employerData.stats.totalApplicants}</div>
          </div>
          <div className="stats-box">
            <div className="title">Hired</div>
            <div className="count">{employerData.stats.hired}</div>
          </div>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <span>Recent Job Posts</span>
              <a href="#">View All</a>
            </div>
            <ul>
              {employerData.recentJobs.map((job, index) => (
                <li key={index}>
                  <span className="job-title">{job.title}</span>
                  <span className="job-date">{job.date}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div className="card-header">
              <span>Recent Applications</span>
              <a href="#">View All</a>
            </div>
            <ul>
              {employerData.recentApplications.map((app, index) => (
                <li key={index}>
                  <span className="app-name">{app.name}</span>
                  <span className="app-job">{app.job}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="quick-actions">
          <div className="quick-title">Quick Actions</div>
          <div className="actions">
            <button className="post-job" onClick={() => setShowForm(true)}>
              Post New Job
            </button>
            <button className="review-applicants">Review Applicants</button>
            <button className="settings">Company Settings</button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form large">
            <h2>Post a New Job</h2>
            <form onSubmit={handleSubmit}>
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                required
              />
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                required
              />
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={jobData.category}
                onChange={handleChange}
                required
              />
              <label>Job Type</label>
              <select
                name="jobType"
                value={jobData.jobType}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
              <label>Job Description</label>
              <textarea
                name="description"
                value={jobData.description}
                onChange={handleChange}
                rows="5"
                required
              />
              <label>Requirements</label>
              <textarea
                name="requirements"
                value={jobData.requirements}
                onChange={handleChange}
                rows="5"
                placeholder="Enter key skills, experience, or education needed..."
                required
              />
              <label>Salary Range</label>
              <div className="salary-range">
                <input
                  type="number"
                  name="salaryMin"
                  value={jobData.salaryMin}
                  onChange={handleChange}
                  placeholder="Min Salary"
                  required
                />
                <span>to</span>
                <input
                  type="number"
                  name="salaryMax"
                  value={jobData.salaryMax}
                  onChange={handleChange}
                  placeholder="Max Salary"
                  required
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  Post Job
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employer;
