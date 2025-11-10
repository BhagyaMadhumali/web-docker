import React from "react";
import { Link } from "react-router-dom";
import "./jobseekerheader.css";

const Jobseekerheader = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="nav-logo">JobPortal</h2>
        <div className="nav-actions">
         
          <Link to="/">
            <button className="signup-btn">Log out</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Jobseekerheader;
