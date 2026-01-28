import React, { useState, useEffect } from "react";
import "./employer.css";
import Employersidebar from "../employersidebar/employersidebar";
import Employerheader from "../employerheader/employerheader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Employer = () => {
  const navigate = useNavigate();
  const [employerData, setEmployerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myJobs, setMyJobs] = useState([]);

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!userData || !token || userData.role !== "employer") {
      navigate("/login");
      return;
    }

    // Set employer data
    setEmployerData({
      name: userData.fullName,
      email: userData.email,
      role: "Employer",
      profilePic: userData.profilePic || null,
    });

    fetchMyJobs(token);
  }, [navigate]);

  const fetchMyJobs = async (token) => {
    try {
      const res = await axios.get("http://localhost:4000/api/jobs/myjobs", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data.success) {
        setMyJobs(res.data.jobs);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#f7fafc'
      }}>
        <div className="loading-spinner-large"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Employersidebar employerData={employerData} />
      <div className="main-content">
        <Employerheader employerData={employerData} />

        {/* Stats */}
        <div className="stats-grid">
          <div className="stats-box">
            <div className="title">Active Jobs</div>
            <div className="count">{myJobs.length}</div>
          </div>
          <div className="stats-box">
            <div className="title">Total Applicants</div>
            <div className="count">0</div>
          </div>
          <div className="stats-box">
            <div className="title">Hired</div>
            <div className="count">0</div>
          </div>
        </div>

        {/* Recent Jobs & Applications */}
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <span>Recent Job Posts</span>
              <button 
                onClick={() => navigate("/myjobs")} 
                style={{ background: 'none', border: 'none', color: '#667eea', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
              >
                View All
              </button>
            </div>
            <ul>
              {myJobs.length === 0 ? (
                <li style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                  No jobs posted yet
                </li>
              ) : (
                myJobs.slice(0, 3).map((job) => (
                  <li key={job._id}>
                    <span className="job-title">{job.title}</span>
                    <span className="job-date">{formatDate(job.createdAt)}</span>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="card">
            <div className="card-header">
              <span>Recent Applications</span>
              <button 
                onClick={() => navigate("/applicants")} 
                style={{ background: 'none', border: 'none', color: '#667eea', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
              >
                View All
              </button>
            </div>
            <ul>
              <li style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                No applications yet
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <div className="quick-title">Quick Actions</div>
          <div className="actions">
            <button className="post-job" onClick={() => navigate("/addjob")}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Post New Job
            </button>
            <button className="review-applicants" onClick={() => navigate("/myjobs")}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              View My Jobs
            </button>
            <button className="settings" onClick={() => alert("Feature coming soon!")}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
              </svg>
              Company Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employer;