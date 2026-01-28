import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "jobseeker",
    profilePic: null
  });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePic: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    if (formData.profilePic) {
      data.append("profilePic", formData.profilePic);
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        body: data
      });

      const result = await res.json();

      if (result.success) {
        alert("Account created successfully! Please login.");
        navigate("/login");
      } else {
        alert(result.message || "Registration failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2 className="welcome-text">Create your account</h2>
        <p className="subtitle">Join JobPortal today and unlock opportunities</p>

        <form onSubmit={handleSubmit}>
          {/* Profile Picture Upload */}
          <div className="profile-pic-section">
            <div className="profile-pic-container">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="profile-preview" />
              ) : (
                <div className="profile-placeholder">
                  <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              )}
            </div>
            <label className="upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <span className="upload-text">Upload Photo</span>
            </label>
          </div>

          {/* Full Name */}
          <div className="form-group">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="input-field"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input-field"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min 6 characters)"
              className="input-field"
              required
              minLength="6"
            />
          </div>

          {/* Role Selection */}
          <div className="form-group">
            <label className="input-label">I am a</label>
            <div className="role-container">
              <label className={`role-option ${formData.role === "jobseeker" ? "role-option-active" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="jobseeker"
                  checked={formData.role === "jobseeker"}
                  onChange={handleChange}
                  className="radio-input"
                />
                <div className="role-content">
                  <svg className="role-icon" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                  </svg>
                  <span className="role-text">Job Seeker</span>
                </div>
              </label>

              <label className={`role-option ${formData.role === "employer" ? "role-option-active" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="employer"
                  checked={formData.role === "employer"}
                  onChange={handleChange}
                  className="radio-input"
                />
                <div className="role-content">
                  <svg className="role-icon" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                  </svg>
                  <span className="role-text">Employer</span>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="signupform-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="signupform-text">
          Already have an account?
          <Link to="/login" className="signupform-link"> Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;