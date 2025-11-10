import React, { useEffect, useState } from "react";
import axios from "axios";
import Jobseekerheader from "../jobseekerheader/jobseekerheader";
import { useNavigate } from "react-router-dom";
import "./jobseeker.css";

const JobSeeker = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/jobs");
        if (res.data.success) setJobs(res.data.jobs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <Jobseekerheader />
      <div className="job-grid">
        {jobs.map((job) => (
          <div
            className="job-box"
            key={job._id}
            onClick={() => navigate(`/job/${job._id}`)}
          >
            <h3>{job.title}</h3>
            <p><strong>Category:</strong> {job.category}</p>
            <p><strong>Job Type:</strong> {job.jobType}</p>
            <p><strong>Location:</strong> {job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSeeker;
