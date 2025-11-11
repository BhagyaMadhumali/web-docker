import React from "react";
import "./employer.css";
import Employersidebar from "../employersidebar/employersidebar";
import Employerheader from "../employerheader/employerheader";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Employersidebar />
      <div className="main-content">
        <Employerheader employerData={employerData} />

        {/* Stats */}
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

        {/* Recent Jobs & Applications */}
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

        {/* Quick Actions */}
        <div className="quick-actions">
          <div className="quick-title">Quick Actions</div>
          <div className="actions">
            <button className="post-job" onClick={() => navigate("/addjob")}>
              Post New Job
            </button>
            <button className="review-applicants">Review Applicants</button>
            <button className="settings">Company Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employer;
