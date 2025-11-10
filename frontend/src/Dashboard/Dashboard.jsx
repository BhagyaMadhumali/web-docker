import React from "react";
import "./Dashboard.css";
import Navbar from "../navbar/Navbar";

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <Navbar />

      {/* Hero Section */}
      <header className="dashboard-header">
        <h1>Welcome to JobPortal Dashboard</h1>
        <p>Manage jobs, applications, and explore career opportunities.</p>
      </header>

      
    </div>
  );
}

export default Dashboard;
