


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../jobseekerheader/jobseekerheader";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

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
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:4000/api/jobs/${id}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) alert("✅ Applied successfully!");
    } catch (err) {
      console.error(err);
      alert("⚠️ Error applying for job.");
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="job-details">
        <h2>{job.title}</h2>
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Job Type:</strong> {job.jobType}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Requirements:</strong> {job.requirements}</p>
        <p><strong>Salary:</strong> {job.salaryMin} to {job.salaryMax}</p>
        <p><strong>Posted By:</strong> {job.postedBy.name}</p>
        <button className="apply-btn" onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
};

export default JobDetails;
