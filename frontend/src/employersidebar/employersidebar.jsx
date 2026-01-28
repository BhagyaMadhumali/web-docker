import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./employersidebar.css";

const Employersidebar = ({ employerData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      {/* Overlay for mobile */}
      <div 
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`employer-sidebar ${isOpen ? "active" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <h2>JobPortal</h2>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/employer" className={isActive("/employer")} onClick={() => setIsOpen(false)}>
                <svg className="nav-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/addjob" className={isActive("/addjob")} onClick={() => setIsOpen(false)}>
                <svg className="nav-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Post Job
              </Link>
            </li>
            <li>
              <Link to="/myjobs" className={isActive("/myjobs")} onClick={() => setIsOpen(false)}>
                <svg className="nav-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                </svg>
                My Jobs
              </Link>
            </li>
            <li>
              <Link to="/applicants" className={isActive("/applicants")} onClick={() => setIsOpen(false)}>
                <svg className="nav-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
                Applicants
              </Link>
            </li>
            <li>
              <Link to="/messages" className={isActive("/messages")} onClick={() => setIsOpen(false)}>
                <svg className="nav-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                </svg>
                Messages
              </Link>
            </li>
            <li>
              <Link to="/settings" className={isActive("/settings")} onClick={() => setIsOpen(false)}>
                <svg className="nav-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Section */}
        {employerData && (
          <div className="sidebar-user">
            <div className="user-info">
              <div className="user-avatar">
                {employerData.profilePic ? (
                  <img 
                    src={`http://localhost:4000/uploads/${employerData.profilePic}`} 
                    alt={employerData.name}
                  />
                ) : (
                  employerData.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="user-details">
                <p className="user-name">{employerData.name}</p>
                <p className="user-role">{employerData.role}</p>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Employersidebar;