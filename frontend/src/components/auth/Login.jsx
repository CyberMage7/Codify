import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

import { PageHeader } from "@primer/react";
import { Box, Button } from "@primer/react";
import "./auth.css";

import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

const Login = () => {
  // useEffect(() => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId");
  //   setCurrentUser(null);
  // });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Floating Fun Elements */}
      <div className="floating-emoji">👋</div>
      <div className="floating-emoji">💻</div>
      <div className="floating-emoji">🚀</div>
      <div className="floating-emoji">⭐</div>
      <div className="code-snippet">{"<Hello />"}</div>
      <div className="code-snippet">{"git push"}</div>
      <div className="code-snippet">{"npm install"}</div>

      <div className="login-box-wrapper">
        <div className="welcome-message">
          👋 Hey Coder, welcome back!
        </div>
        <div className="welcome-subtitle">
          Let's get you back into the coding zone 🎯
        </div>

        <div className="login-box">
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="submit-btn login-btn"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Signing you in...
              </>
            ) : (
              "🚀 Let's Code!"
            )}
          </button>
        </div>
        
        <div className="pass-box">
          <p>
            New to Codify? <Link to="/signup">Join the community! 🎉</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
