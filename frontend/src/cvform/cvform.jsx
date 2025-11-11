import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Jobseekerheader from "../jobseekerheader/jobseekerheader";
import "./cvform.css";

const CVForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const job = state?.job;

  const [cvData, setCvData] = useState({
    // Personal info
    fullName: "",
    email: "",
    phone: "",
    sex: "",
    address: "",
    education: "",
    skills: "",
    experience: "",
    coverLetter: "",

    // Job info (auto-filled)
    jobId: job?._id || "",
    jobTitle: job?.title || "",
    jobCategory: job?.category || "",
    jobType: job?.jobType || "",
    jobLocation: job?.location || "",
    jobSalaryMin: job?.salaryMin || 0,
    jobSalaryMax: job?.salaryMax || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCvData({ ...cvData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login to submit CV");

      const res = await axios.post(
        "http://localhost:4000/api/applications",
        cvData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("✅ CV submitted successfully!");
        navigate("/jobseeker");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error submitting CV. Please try again.");
    }
  };

  return (
    <div className="cvform-container">
      <Jobseekerheader />
      <div className="cvform-content">
      
        <form onSubmit={handleSubmit} className="cv-form">
          {/* Job Info - Readonly */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">💼</div>
              <h3>Job Information</h3>
            </div>
            <div className="job-info-grid">
              <div className="input-group">
                <label>Job Title</label>
                <div className="readonly-field">{cvData.jobTitle}</div>
              </div>
              <div className="input-group">
                <label>Category</label>
                <div className="readonly-field">{cvData.jobCategory}</div>
              </div>
              <div className="input-group">
                <label>Job Type</label>
                <div className="readonly-field">{cvData.jobType}</div>
              </div>
              <div className="input-group">
                <label>Location</label>
                <div className="readonly-field">{cvData.jobLocation}</div>
              </div>
              <div className="input-group">
                <label>Salary Range</label>
                <div className="readonly-field salary-range">
                  ${cvData.jobSalaryMin} - ${cvData.jobSalaryMax}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">👤</div>
              <h3>Personal Information</h3>
            </div>
            <div className="personal-info-grid">
              <div className="input-group">
                <label>Full Name <span className="required">*</span></label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={cvData.fullName} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your full name"
                />
              </div>
              <div className="input-group">
                <label>Email <span className="required">*</span></label>
                <input 
                  type="email" 
                  name="email" 
                  value={cvData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="input-group">
                <label>Phone Number <span className="required">*</span></label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={cvData.phone} 
                  onChange={handleChange} 
                  required 
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="input-group">
                <label>Gender</label>
                <select 
                  name="sex" 
                  value={cvData.sex} 
                  onChange={handleChange}
                  className="select-field"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div className="input-group full-width">
                <label>Address</label>
                <textarea 
                  name="address" 
                  value={cvData.address} 
                  onChange={handleChange} 
                  rows="2" 
                  placeholder="Enter your complete address"
                />
              </div>
            </div>
          </div>

          {/* Education & Experience */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">🎓</div>
              <h3>Education & Experience</h3>
            </div>
            <div className="education-experience-grid">
              <div className="input-group full-width">
                <label>Education <span className="required">*</span></label>
                <textarea 
                  name="education" 
                  value={cvData.education} 
                  onChange={handleChange} 
                  rows="3" 
                  required 
                  placeholder="List your educational background, degrees, and institutions"
                />
              </div>
              <div className="input-group full-width">
                <label>Skills (comma separated) <span className="required">*</span></label>
                <input 
                  type="text" 
                  name="skills" 
                  value={cvData.skills} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g., JavaScript, React, Project Management, Communication"
                />
                <div className="input-hint">Separate multiple skills with commas</div>
              </div>
              <div className="input-group full-width">
                <label>Work Experience <span className="required">*</span></label>
                <textarea 
                  name="experience" 
                  value={cvData.experience} 
                  onChange={handleChange} 
                  rows="3" 
                  required 
                  placeholder="Describe your work experience, previous roles, and achievements"
                />
              </div>
              <div className="input-group full-width">
                <label>Cover Letter</label>
                <textarea 
                  name="coverLetter" 
                  value={cvData.coverLetter} 
                  onChange={handleChange} 
                  rows="5" 
                  placeholder="Write a compelling cover letter explaining why you're the perfect candidate for this position..."
                />
                <div className="input-hint">This is your chance to make a great impression!</div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-cv-btn">
              <span className="btn-icon">📄</span>
              Submit Application
            </button>
            <div className="form-note">
              <span className="required">*</span> indicates required fields
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CVForm;