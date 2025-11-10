import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./createAccount.css";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    profilePic: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (data.success) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert(data.message);
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
        <h2 className="welcome-text">Create Account</h2>
        <p className="subtitle">Join JobPortal and start your journey</p>

        <form onSubmit={handleSubmit}>
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

          <div className="form-group">
            <label className="input-label">Email Address</label>
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

          <div className="form-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label">Profile Picture (Optional)</label>
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="input-field"
            />
          </div>

        <div className="form-group">
            <label className="input-label">I am a</label>
            <div className="role-options">
              {["jobseeker", "employer"].map((role) => (
                <button
                  type="button"
                  key={role}
                  className={`role-btn ${
                    formData.role === role ? "selected" : ""
                  }`}
                  onClick={() => handleRoleSelect(role)}
                >
                  {role === "jobseeker" ? "Job Seeker" : "Employer"}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn2 primary2-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="signupform2-text">
          Already have an account?{" "}
          <Link to="/login" className="signupform2-link">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
