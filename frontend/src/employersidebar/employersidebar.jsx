import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./employersidebar.css";

const Employersidebar = ({ onPostJobClick }) => {
  return (
    <aside className="sidebar">
      <div className="logo">JobPortal</div>
      <nav>
        <Link to="/">Dashboard</Link>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPostJobClick();
          }}
        >
          Post Job
        </a>
        <Link to="/managejob">Manage Job</Link> {/* ✅ Navigate to /managejob */}
        <Link to="/company-profile">Company Profile</Link>
      </nav>
    </aside>
  );
};

export default Employersidebar;
