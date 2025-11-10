import React, { useEffect, useState } from "react";
import axios from "axios";
import Employersidebar from "../employersidebar/employersidebar";
import Employerheader from "../employerheader/employerheader";
import "./managejob.css";

const ManageJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleEdit = (jobId) => {
    // redirect to edit page or open popup
    alert(`Edit job with ID: ${jobId}`);
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
                  <button onClick={() => handleEdit(job._id)} className="edit-btn">
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
