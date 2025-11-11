import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Employersidebar from "../employersidebar/employersidebar";
import Employerheader from "../employerheader/employerheader";
import "./managejob.css";

const ManageJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data.jobs);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    // Navigate to AddJob page and pass job data
    navigate("/addjob", { state: { job } });
  };

 const handleDelete = async (appId) => {
  if (window.confirm("Are you sure you want to delete this application?")) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:4000/api/applicants/${appId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setApplications(applications.filter((app) => app._id !== appId));
        alert("✅ Application deleted successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error deleting application.");
    }
  }
};


  return (
    <div className="dashboard-container">
      <Employersidebar />
      <div className="main-content">
        <Employerheader />
        <h2>Manage Jobs</h2>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
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
    </div>
  );
};

export default ManageJob;
