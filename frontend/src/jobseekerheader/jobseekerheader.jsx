import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./jobseekerheader.css";

const Jobseekerheader = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!userData) return null;

  return (
    <header className="jobseeker-header">
      <div className="jobseeker-header-content">
        {/* Logo */}
        <div className="jobseeker-logo" onClick={() => navigate("/jobseeker")}>
          JobPortal
        </div>

        {/* Desktop Navigation */}
        <nav className="jobseeker-nav">
          <button 
            onClick={() => navigate("/jobseeker")}
            style={{ background: 'none', border: 'none', color: '#4a5568', fontWeight: 500, cursor: 'pointer', fontSize: '15px', padding: 0 }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
              <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
            </svg>
            Browse Jobs
          </button>
          <button 
            onClick={() => alert("Feature coming soon!")}
            style={{ background: 'none', border: 'none', color: '#4a5568', fontWeight: 500, cursor: 'pointer', fontSize: '15px', padding: 0 }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            My Applications
          </button>
          <button 
            onClick={() => alert("Feature coming soon!")}
            style={{ background: 'none', border: 'none', color: '#4a5568', fontWeight: 500, cursor: 'pointer', fontSize: '15px', padding: 0 }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Profile
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="jobseeker-menu-toggle" onClick={toggleMenu}>
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>

        {/* User Section */}
        <div className="jobseeker-user">
          {/* Notifications */}
          <div className="jobseeker-notification">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
            <span className="jobseeker-notification-badge">2</span>
          </div>

          {/* Profile */}
          <div className="jobseeker-profile">
            <div className="jobseeker-avatar">
              {userData.profilePic ? (
                <img 
                  src={`http://localhost:4000/uploads/${userData.profilePic}`} 
                  alt={userData.fullName}
                />
              ) : (
                userData.fullName.charAt(0).toUpperCase()
              )}
            </div>
            <span className="jobseeker-profile-name">{userData.fullName}</span>
            <svg className="jobseeker-dropdown" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>

          {/* Logout Button (you can add a dropdown here) */}
          <button className="jobseeker-logout-btn" onClick={handleLogout}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`jobseeker-mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <button 
          onClick={() => { navigate("/jobseeker"); setIsMenuOpen(false); }}
          style={{ background: 'none', border: 'none', color: '#4a5568', fontWeight: 500, cursor: 'pointer', width: '100%', textAlign: 'left', padding: '12px 16px', fontSize: '15px' }}
        >
          Browse Jobs
        </button>
        <button 
          onClick={() => { alert("Feature coming soon!"); setIsMenuOpen(false); }}
          style={{ background: 'none', border: 'none', color: '#4a5568', fontWeight: 500, cursor: 'pointer', width: '100%', textAlign: 'left', padding: '12px 16px', fontSize: '15px' }}
        >
          My Applications
        </button>
        <button 
          onClick={() => { alert("Feature coming soon!"); setIsMenuOpen(false); }}
          style={{ background: 'none', border: 'none', color: '#4a5568', fontWeight: 500, cursor: 'pointer', width: '100%', textAlign: 'left', padding: '12px 16px', fontSize: '15px' }}
        >
          Profile
        </button>
      </div>
    </header>
  );
};

export default Jobseekerheader;