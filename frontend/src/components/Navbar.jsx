import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Text, Avatar } from "@primer/react";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const userName = "Vishwas"; // This would normally come from user context or state
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/auth");
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <Box className="logo-text">
              <Text sx={{ fontSize: 22, fontWeight: 'bold', color: '#fff', letterSpacing: '1px' }}>
                CODIFY<span className="logo-accent">.</span>
              </Text>
            </Box>
          </Link>
        </div>
        
        <div className="navbar-right">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              className="user-profile"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mr: 4,
                color: '#fff'
              }}
            >
              <Avatar 
                src="https://avatars.githubusercontent.com/u/12345678?v=4" 
                size={32} 
                className="user-avatar"
                sx={{ mr: 2 }}
              />
              <Text sx={{ fontSize: 14, fontWeight: 500 }}>{userName}</Text>
            </Box>
            
            <Box 
              className="logout-button"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: '#fff',
                py: 1,
                px: 3,
                borderRadius: '4px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                transition: 'all 0.2s ease'
              }}
              onClick={handleLogout}
            >
              <Text sx={{ fontSize: 14, fontWeight: 500 }}>Logout</Text>
            </Box>
          </Box>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
