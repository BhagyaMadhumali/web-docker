import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../jobseekerheader/jobseekerheader";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/jobs/${id}`);
        if (res.data.success) setJob(res.data.job);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      setIsApplying(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to apply for this job");
        return;
      }

      const res = await axios.post(
        `http://localhost:4000/api/jobs/${id}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.data.success) {
        alert("✅ Applied successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error applying for job. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  if (!job) {
    return (
      <div className="job-details-container">
        <Navbar />
        <div className="loading-spinner">Loading job details...</div>
      </div>
    );
  }

  return (
    <div className="job-details-container">
      <Navbar />
      <div className="job-details-content">
        <div className="job-details-card">
          <div className="job-header">
            <h1>{job.title}</h1>
            <div className="job-meta">
              <span className="job-category">{job.category}</span>
              <span className="job-type">{job.jobType}</span>
              <span className="job-location">📍 {job.location}</span>
            </div>
          </div>

          <div className="job-salary-section">
            <h3>💵 Salary Range</h3>
            <p className="salary-range">${job.salaryMin} - ${job.salaryMax}</p>
          </div>

          <div className="job-description-section">
            <h3>📝 Job Description</h3>
            <p>{job.description}</p>
          </div>

          <div className="job-requirements-section">
            <h3>🎯 Requirements</h3>
            <p>{job.requirements}</p>
          </div>

    
          <div className="job-actions">
            <button 
              className={`apply-btn ${isApplying ? 'applying' : ''}`}
              onClick={handleApply}
              disabled={isApplying}
            >
              {isApplying ? 'Applying...' : 'Apply Now'}
            </button>
            <button className="save-btn">Save Job</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;