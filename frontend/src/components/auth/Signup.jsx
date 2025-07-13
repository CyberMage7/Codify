import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

import { PageHeader } from "@primer/react";
import { Box, Button } from "@primer/react";
import "./auth.css";

import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/signup", {
        email: email,
        password: password,
        username: username,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/";    } catch (err) {
      console.error(err);
      // Show specific error message from the server
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Signup Failed!");
      }
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Floating Fun Elements */}
      <div className="floating-emoji">🎉</div>
      <div className="floating-emoji">💻</div>
      <div className="floating-emoji">🌟</div>
      <div className="floating-emoji">🚀</div>
      <div className="code-snippet">{"const dev = new Developer()"}</div>
      <div className="code-snippet">{"git init"}</div>
      <div className="code-snippet">{"npm create"}</div>

      <div className="login-box-wrapper">
        <div className="welcome-message">
          🎉 Join the Codify Family!
        </div>
        <div className="welcome-subtitle">
          Ready to start your coding journey? Let's create magic together! ✨
        </div>

        <div className="login-box">
          <div className="input-group">
            <label className="label">Username</label>
            <input
              autoComplete="off"
              name="Username"
              id="Username"
              className="input"
              type="text"
              placeholder="your-awesome-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              placeholder="your-email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="submit-btn signup-button"
            disabled={loading}
            onClick={handleSignup}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Creating your account...
              </>
            ) : (
              "🚀 Start Coding!"
            )}
          </button>
        </div>

        <div className="pass-box">
          <p>
            Already part of the family? <Link to="/auth">Welcome back! 👋</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
