import React from "react";
import "./employerheader.css";

const Employerheader = ({ name, role, profilePic }) => {
  return (
    <header className="header">
      <div className="title">Dashboard</div>
      <div className="profile">
        <img src={profilePic} alt="Profile" />
        <div className="info">
          <span>{name}</span>
          <span>
            {role} <span>▼</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Employerheader;
