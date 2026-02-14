import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import Navbar from "../Header/Navbar";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url('/hero page.png')` }}
    >
      {/* ✅ Navbar on top of the hero */}
      <Navbar />

      <div className="overlay">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Job Here...</h1>
          <p className="hero-subtitle">
            Explore thousands of job opportunities and connect with top employers.
          </p>
          <div className="hero-buttons">
            <button
              className="btn primary-btn"
              onClick={() => navigate("/signup")}
            >
              Post a Job
            </button>
            <button
              className="btn secondary-btn"
              onClick={() => navigate("/signup")}
            >
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
