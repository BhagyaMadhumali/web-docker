import React from "react";
import "./Hero.css";
import Navbar from "../Header/Navbar";

const Hero = () => {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url('/hero page.png')` }}
    >
      {/* ✅ Navbar on top of the hero */}
      <Navbar />

      <div className="overlay">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Job Today</h1>
          <p className="hero-subtitle">
            Explore thousands of job opportunities and connect with top employers.
          </p>
          <div className="hero-buttons">
            <button className="btn primary-btn">Post a Job</button>
            <button className="btn secondary-btn">Find Jobs</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
