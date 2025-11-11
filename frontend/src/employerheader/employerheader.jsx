import React from "react";
import { useNavigate } from "react-router-dom";
import "./employerheader.css";

const Employerheader = ({ name, role, profilePic }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT or login token
    navigate("/"); // redirect to home
  };

  return (
    <header className="header">
      <div className="profile">
        <img src={profilePic} alt="Profile" />
        <div className="info">
          <span>{name}</span>
          <span>
            {role} <span>▼</span>
          </span>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Employerheader;
