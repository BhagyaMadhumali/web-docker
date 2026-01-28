import React from "react";
import "./employerheader.css";

const Employerheader = ({ employerData }) => {
  if (!employerData) return null;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="employer-header">
      <div className="header-welcome">
        <p className="header-greeting">{getGreeting()},</p>
        <h1 className="header-title">{employerData.name}</h1>
      </div>

      <div className="header-actions">
        {/* Notifications */}
        <div className="header-notification">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <span className="notification-badge">3</span>
        </div>

        {/* Profile */}
        <div className="header-profile">
          <div className="header-profile-pic">
            {employerData.profilePic ? (
              <img 
                src={`http://localhost:4000/uploads/${employerData.profilePic}`} 
                alt={employerData.name}
              />
            ) : (
              employerData.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="header-profile-info">
            <p className="header-profile-name">{employerData.name}</p>
            <p className="header-profile-role">{employerData.role}</p>
          </div>
          <svg className="header-dropdown-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Employerheader;