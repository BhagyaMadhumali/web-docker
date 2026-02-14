import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Jobseekerheader from "../jobseekerheader/jobseekerheader";
import "./jobseeker-advanced.css";

const JobSeeker = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!userData || !token || userData.role !== "jobseeker") {
      navigate("/login");
      return;
    }

    fetchJobs();
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/jobs", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) {
        setJobs(res.data.jobs || []);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || job.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(jobs.map((job) => job.category).filter(Boolean))];

  const formatSalary = (job) => {
    if (job.salaryMin && job.salaryMax) {
      return `$${job.salaryMin.toLocaleString()} – $${job.salaryMax.toLocaleString()}`;
    }
    return job.salary || "Not specified";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${diffDays >= 14 ? "s" : ""} ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="jobseeker-app">
      <Jobseekerheader />

      <main className="jobseeker-main">
        {/* Stats */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon green-1">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
              </div>
              <div className="stat-text">
                <h4>Total Jobs</h4>
                <p className="value">{jobs.length}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green-2">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
              </div>
              <div className="stat-text">
                <h4>Applications</h4>
                <p className="value">12</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green-3">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2zM7 7h2v10H7V7z"/></svg>
              </div>
              <div className="stat-text">
                <h4>Interviews</h4>
                <p className="value">5</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green-4">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
              <div className="stat-text">
                <h4>Saved Jobs</h4>
                <p className="value">8</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search + Filter */}
        <section className="search-section">
          <div className="search-bar">
            <div className="search-input-group">
              <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                placeholder="Job title, company, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            <button className="search-btn">Find Jobs</button>
          </div>
        </section>

        {/* Results */}
        <section className="results-section">
          <div className="results-header">
            <h2>{filteredJobs.length} Jobs Found</h2>
            <select className="sort-select">
              <option>Most Recent</option>
              <option>Salary: High → Low</option>
              <option>Salary: Low → High</option>
            </select>
          </div>

          {loading ? (
            <div className="loading-wrapper">
              <div className="spinner"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="currentColor" className="empty-icon">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
              </svg>
              <h3>No jobs found</h3>
              <p>Try changing search terms or filters</p>
            </div>
          ) : (
            <div className="job-grid">
              {filteredJobs.map((job, index) => (
                <div
                  className="job-card"
                  key={job._id}
                  onClick={() => navigate(`/job/${job._id}`)}
                  style={{ "--card-index": index }}
                >
                  <div className="job-card-inner">
                    <div className="job-top">
                      <div>
                        <h3 className="job-title">{job.title}</h3>
                        <p className="company-name">{job.postedBy?.fullName || "Company"}</p>
                      </div>
                      <button
                        className="bookmark-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: implement save job logic
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>

                    <div className="job-tags">
                      <span className="tag">{job.category || "General"}</span>
                      <span className="tag">{job.jobType || "Full-time"}</span>
                    </div>

                    <div className="job-meta">
                      <div className="meta-item">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        <span>{job.location || "Remote / Hybrid"}</span>
                      </div>
                      <div className="meta-item">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                        <span>{formatSalary(job)}</span>
                      </div>
                      <div className="meta-item">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                        <span>Posted {formatDate(job.createdAt)}</span>
                      </div>
                    </div>

                    <button className="view-btn">
                      View Details
                      <svg viewBox="0 0 20 20" fill="currentColor" className="arrow-icon">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default JobSeeker;