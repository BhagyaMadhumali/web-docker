import React, { useState } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
        // Store token
        localStorage.setItem("token", data.token);
        
        // Store user data
        localStorage.setItem("user", JSON.stringify(data.user));

        // Navigate based on role
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
    <div className="login-page">
      <div className="login-box">
        {/* Login Icon */}
        <div className="login-icon-container">
          <div className="login-icon">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
        </div>

        <div className="login-header">
          <h2 className="login-welcome-text">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your JobPortal account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label className="login-input-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="login-input-field"
              required
            />
          </div>

          <div className="login-form-group">
            <label className="login-input-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="login-input-field"
              required
            />
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <button 
              type="button"
              onClick={() => alert("Password reset feature coming soon!")}
              style={{ background: 'none', border: 'none', color: '#667eea', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="login-divider">or</div>

        <p className="signup-prompt-text">
          Don't have an account?
          <Link to="/signup" className="signup-prompt-link"> Create an account</Link>
        </p>
      </div>
    </div>
  );
}