import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Jobseekerheader from "../jobseekerheader/jobseekerheader";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/jobs/${id}`);
        if (res.data.success) setJob(res.data.job);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = () => {
    navigate(`/apply/${id}`, { state: { job } });
  };

  if (loading) return <><Jobseekerheader /><p>Loading job details...</p></>;
  if (!job) return <><Jobseekerheader /><p>Job not found.</p></>;

  return (
    <div className="job-details-container">
      <Jobseekerheader />
      <div className="job-details-card">
        <h1>{job.title}</h1>
        <p><span>{job.category}</span></p>
        <p><span>{job.jobType}</span></p>
        <p><span>{job.location}</span></p>
        <p><span>${job.salaryMin} - ${job.salaryMax}</span></p>
        <p><span>{job.description}</span></p>
        <p><span>{job.requirements}</span></p>
        <button onClick={handleApply}>Apply Now</button>
      </div>
    </div>
  );
};

export default JobDetails;