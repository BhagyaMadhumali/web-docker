import React from "react";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2 className="welcome-text">Create your account</h2>
        <p className="subtitle">Join JobPortal today</p>

        <form>
          <div className="form-group">
            <label className="input-label">Email</label>
            <input type="email" placeholder="Enter your email" className="input-field" />
          </div>

          <div className="form-group">
            <label className="input-label">Password</label>
            <input type="password" placeholder="Enter your password" className="input-field" />
          </div>

          <button type="submit" className="btn1 signupform-btn">
            Sign Up
          </button>
        </form>

        <p className="loginform-text">
          Don't  have an account?
          <a href="/signup" className="signupform-link">
            {" "}Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
