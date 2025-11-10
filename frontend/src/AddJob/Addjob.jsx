import React, { useState } from "react";
import "../Header/Navbar.css";
import Navbar from "../Header/Navbar";
import "./Addjob.css";

const Addjob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Job added successfully!");
        setFormData({
          title: "",
          company: "",
          location: "",
          jobType: "",
          salary: "",
          description: "",
        });
      } else {
        alert("Failed to add job.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to the server.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="addjob-container">
        <div className="addjob-card">
          <h2>Add New Job</h2>
          <form onSubmit={handleSubmit} className="addjob-form">
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter job title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                placeholder="Enter company name"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter job location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="form-group">
              <label>Salary (LKR)</label>
              <input
                type="number"
                name="salary"
                placeholder="Enter salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter job description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-submit">
              Add Job
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addjob;
