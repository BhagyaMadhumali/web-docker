import React, { useState } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);

        // Check user role and navigate
        if (data.user.role === "employer") {
          navigate("/employer");
        } else if (data.user.role === "jobseeker") {
          navigate("/jobseeker");
        } else {
          alert("Unknown user role");
        }
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2 className="welcome-text">Welcome Back</h2>
        <p className="subtitle">Sign in to your JobPortal account</p>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn1 signinform-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="signupform-text">
          Don't have an account?
          <Link to="/signup" className="signupform-link">
            {" "}Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
