import React, { useState, useEffect } from "react";
import "./employer.css";
import axios from "axios";
import Employersidebar from "../employersidebar/employersidebar";
import Employerheader from "../employerheader/employerheader";

const employerData = {
  name: "John Doe",
  role: "Employer",
  profilePic: "https://via.placeholder.com/40",
  stats: { activeJobs: 5, totalApplicants: 23, hired: 2 },
  recentJobs: [],
  recentApplications: [],
};

const Employer = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);
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

  // Fetch employer jobs
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data.jobs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  // Post new job or update existing
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (editingJobId) {
        // Update job
        const res = await axios.put(
          `http://localhost:4000/api/jobs/${editingJobId}`,
          jobData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) alert("✅ Job updated successfully!");
      } else {
        // Post new job
        const res = await axios.post("http://localhost:4000/api/jobs", jobData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) alert("✅ Job posted successfully!");
      }

      setShowForm(false);
      setEditingJobId(null);
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
      fetchJobs(); // refresh list
    } catch (err) {
      console.error(err);
      alert("⚠️ Error posting/updating job. Please try again.");
    }
  };

  const handleEdit = (job) => {
    setJobData({
      title: job.title,
      location: job.location,
      category: job.category,
      jobType: job.jobType,
      description: job.description,
      requirements: job.requirements,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
    });
    setEditingJobId(job._id);
    setShowForm(true);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:4000/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(jobs.filter((job) => job._id !== jobId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <Employersidebar onPostJob={() => setShowForm(true)} />

      <div className="main-content">
        <Employerheader employerData={employerData} />

        <h2>Manage Jobs</h2>

        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <div className="job-table">
            <div className="job-row header">
              <span>Title</span>
              <span>Category</span>
              <span>Job Type</span>
              <span>Salary</span>
              <span>Actions</span>
            </div>
            {jobs.map((job) => (
              <div className="job-row" key={job._id}>
                <span>{job.title}</span>
                <span>{job.category}</span>
                <span>{job.jobType}</span>
                <span>
                  ${job.salaryMin} - ${job.salaryMax}
                </span>
                <span className="actions">
                  <button onClick={() => handleEdit(job)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(job._id)} className="delete-btn">
                    Delete
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form large">
            <h2>{editingJobId ? "Update Job" : "Post a New Job"}</h2>
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
              <select name="jobType" value={jobData.jobType} onChange={handleChange} required>
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
                  {editingJobId ? "Update Job" : "Post Job"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowForm(false);
                    setEditingJobId(null);
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
                  }}
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
