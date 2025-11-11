import React, { useEffect, useState } from "react";
import axios from "axios";
import Employersidebar from "../employersidebar/employersidebar";
import Employerheader from "../employerheader/employerheader";
import "./viewapplicants.css";

const ViewApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/applicants/employer-applicants", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setApplicants(res.data.applicants);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div className="dashboard-container">
      <Employersidebar />
      <div className="main-content">
        <Employerheader />
        <h2>Applicants for Your Jobs</h2>
        {loading ? (
          <p>Loading applicants...</p>
        ) : applicants.length === 0 ? (
          <p>No applicants yet.</p>
        ) : (
          <div className="applicant-table">
            <div className="applicant-row header">
              <span>Full Name</span>
              <span>Email</span>
              <span>Contact</span>
              <span>Job Applied</span>
              <span>Skills</span>
            </div>
            {applicants.map((app) => (
              <div key={app._id} className="applicant-row">
                <span>{app.fullName}</span>
                <span>{app.email}</span>
                <span>{app.contactNumber}</span>
                <span>{app.jobId?.title}</span>
                <span>{app.skills}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewApplicants;
