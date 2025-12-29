import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";
import axios from "axios";
import "./Auth.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ useRef so browser treats it as user-initiated
  const successSoundRef = useRef(
    new Audio(`${window.location.origin}/login-success.mp3`)
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://to-do-backend-6-p55q.onrender.com/api/auth/login",
        formData
      );

      if (res.data.success) {
        // 🔊 SAFE SOUND PLAY
        try {
          const sound = successSoundRef.current;
          sound.volume = 0.8;
          sound.currentTime = 0;
          await sound.play();
        } catch (err) {
          console.warn("Sound blocked by browser");
        }

        login(res.data.data, res.data.data.token);

        // small delay = premium feel
        setTimeout(() => navigate("/"), 300);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ThemeToggle />

      <div className="auth-container luxury-bg">
        {/* BACKGROUND GLOW */}
        <div className="background-shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
        </div>

        <div className="auth-glass-card premium-card">
          {/* BRAND */}
          <div className="brand-top">
            <h1 className="brand-name">Ashish Jha</h1>
            <p className="brand-slogan">My Aim, Your Progress</p>
          </div>

          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">
              Focus today. Win tomorrow. Stay consistent.
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* EMAIL */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="glass-input large-input"
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="glass-input large-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  👁
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-btn gold-btn"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Enter Workspace"}
            </button>
          </form>

          <p className="auth-link">
            New here? <Link to="/signup">Create your account</Link>
          </p>
        </div>
      </div>

      <footer className="app-footer">
        <span>
          Crafted with ❤️ by <strong>Ashish Jha</strong>
        </span>
      </footer>
    </>
  );
}

export default Login;
