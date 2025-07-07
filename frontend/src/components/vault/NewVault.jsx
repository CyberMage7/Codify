import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Button, FormControl } from '@primer/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './NewVault.css';

const NewVault = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    visibility: true, // true = public, false = private
    primaryLanguage: 'JavaScript',
    addReadme: false,
    addGitignore: false,
    gitignoreTemplate: 'Node'
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDescTooltip, setShowDescTooltip] = useState(false);
  const [nameValidation, setNameValidation] = useState({ isValid: null, message: '' });
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showGitignoreDropdown, setShowGitignoreDropdown] = useState(false);
  const languageDropdownRef = useRef(null);
  const gitignoreDropdownRef = useRef(null);
  const navigate = useNavigate();

  const languages = [
    { name: 'JavaScript', icon: '🟨', color: '#f7df1e' },
    { name: 'TypeScript', icon: '🔷', color: '#3178c6' },
    { name: 'Python', icon: '🐍', color: '#3776ab' },
    { name: 'Java', icon: '☕', color: '#ed8b00' },
    { name: 'C++', icon: '⚡', color: '#00599c' },
    { name: 'C#', icon: '🔵', color: '#239120' },
    { name: 'Go', icon: '🚀', color: '#00add8' },
    { name: 'Rust', icon: '🦀', color: '#000000' },
    { name: 'PHP', icon: '🐘', color: '#777bb4' },
    { name: 'Ruby', icon: '💎', color: '#cc342d' },
    { name: 'Swift', icon: '🍎', color: '#fa7343' },
    { name: 'Kotlin', icon: '🎯', color: '#7f52ff' },
    { name: 'HTML', icon: '🌐', color: '#e34f26' },
    { name: 'CSS', icon: '🎨', color: '#1572b6' },
    { name: 'Other', icon: '📁', color: '#6c757d' }
  ];

  const gitignoreTemplates = [
    { name: 'Node', icon: '🟢', description: 'For Node.js projects (npm, node_modules, etc.)' },
    { name: 'Python', icon: '🐍', description: 'For Python projects (__pycache__, .pyc, venv, etc.)' },
    { name: 'Java', icon: '☕', description: 'For Java projects (.class, .jar, target/, etc.)' },
    { name: 'React', icon: '⚛️', description: 'For React applications (build/, .env, etc.)' },
    { name: 'Vue', icon: '💚', description: 'For Vue.js projects (dist/, .nuxt/, etc.)' },
    { name: 'Angular', icon: '🅰️', description: 'For Angular projects (dist/, .angular/, etc.)' },
    { name: 'C++', icon: '⚡', description: 'For C++ projects (*.o, *.exe, build/, etc.)' },
    { name: 'C#', icon: '🔵', description: 'For .NET projects (bin/, obj/, *.dll, etc.)' },
    { name: 'Go', icon: '🚀', description: 'For Go projects (vendor/, *.exe, etc.)' },
    { name: 'Rust', icon: '🦀', description: 'For Rust projects (target/, Cargo.lock, etc.)' },
    { name: 'PHP', icon: '🐘', description: 'For PHP projects (vendor/, .env, etc.)' },
    { name: 'Ruby', icon: '💎', description: 'For Ruby projects (.bundle/, vendor/, etc.)' },
    { name: 'Swift', icon: '🍎', description: 'For Swift projects (*.xcworkspace, etc.)' },
    { name: 'Unity', icon: '🎮', description: 'For Unity game projects (Library/, Temp/, etc.)' },
    { name: 'MacOS', icon: '🍎', description: 'For macOS development (.DS_Store, etc.)' },
    { name: 'Windows', icon: '🪟', description: 'For Windows development (Thumbs.db, etc.)' },
    { name: 'Visual Studio', icon: '💜', description: 'For Visual Studio projects (.vs/, etc.)' },
    { name: 'JetBrains', icon: '🧠', description: 'For JetBrains IDEs (.idea/, etc.)' }
  ];

  // Animated placeholder texts for description
  const descriptionPlaceholders = [
    "This vault is all about... 🚀",
    "Building something amazing... ✨",
    "Solving real-world problems... 💡",
    "Creating the next big thing... 🌟",
    "Coding with passion and purpose... 💻",
    "Turning ideas into reality... 🎯"
  ];

  // Cycle through placeholders every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % descriptionPlaceholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
      if (gitignoreDropdownRef.current && !gitignoreDropdownRef.current.contains(event.target)) {
        setShowGitignoreDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vault name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Vault name must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9-_]+$/.test(formData.name)) {
      newErrors.name = 'Vault name can only contain letters, numbers, hyphens, and underscores';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateNameRealTime = (name) => {
    if (!name.trim()) {
      setNameValidation({ isValid: null, message: '' });
      return;
    }
    
    if (name.length < 3) {
      setNameValidation({ isValid: false, message: 'Too short (min 3 characters)' });
    } else if (name.length > 50) {
      setNameValidation({ isValid: false, message: 'Too long (max 50 characters)' });
    } else if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
      setNameValidation({ isValid: false, message: 'Only letters, numbers, hyphens, and underscores allowed' });
    } else if (/^[-_]|[-_]$/.test(name)) {
      setNameValidation({ isValid: false, message: 'Cannot start or end with hyphens or underscores' });
    } else if (/--+|__+/.test(name)) {
      setNameValidation({ isValid: false, message: 'Consecutive hyphens or underscores not allowed' });
    } else {
      setNameValidation({ isValid: true, message: 'Perfect vault name!' });
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFormData({ ...formData, name: newName });
    validateNameRealTime(newName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // Get user ID from localStorage
      let userID = localStorage.getItem('userID');
      if (!userID) {
        // For testing purposes, set a test userID
        userID = '507f1f77bcf86cd799439011'; // Valid MongoDB ObjectId format
        localStorage.setItem('userID', userID);
        console.log('Set test userID:', userID);
      }
      console.log('Using userID:', userID);

      // Prepare the data for the backend
      const requestData = {
        owner: userID,
        name: formData.name.trim(),
        description: formData.description.trim(),
        visibility: formData.visibility,
        primaryLanguage: formData.primaryLanguage,
        addReadme: formData.addReadme,
        addGitignore: formData.addGitignore,
        gitignoreTemplate: formData.gitignoreTemplate
      };

      console.log('Sending request to backend:', requestData);
      
      const response = await fetch('http://localhost:3000/repo/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create vault');
      }

      // Success! Show success message and navigate to dashboard
      console.log('Vault created successfully:', data.repository);
      
      // Show success message
      alert(`🎉 Vault "${data.repository.name}" created successfully!`);
      
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (error) {
      console.error('Error creating vault:', error.message);
      setErrors({ 
        general: error.message || 'Failed to create vault. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box className="new-vault-container">
        {/* Playful Header */}
        <Box className="playful-header">
          <div className="gradient-background"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
          
          <Box className="header-content">
            <Box className="animation-container">
              <div className="rocket-animation">
                <div className="rocket">
                  <div className="rocket-body">🚀</div>
                  <div className="rocket-flame">
                    <div className="flame"></div>
                    <div className="flame"></div>
                    <div className="flame"></div>
                  </div>
                </div>
                <div className="stars">
                  <div className="star">✨</div>
                  <div className="star">⭐</div>
                  <div className="star">💫</div>
                  <div className="star">✨</div>
                </div>
              </div>
              
              <div className="coding-bot">
                <div className="bot-face">🤖</div>
                <div className="typing-indicator">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <div className="code-lines">
                  <div className="code-line">{'<vault>'}</div>
                  <div className="code-line">{'  awesome_code'}</div>
                  <div className="code-line">{'</vault>'}</div>
                </div>
              </div>
            </Box>
            
            <Box className="header-text">
              <Text className="main-title">
                🚀 Launch Your New Vault
              </Text>
              <br></br>
              <Text className="subtitle">
                Let's get your code adventure started! ✨
              </Text>
              <Text className="fun-text">
                Every great project begins with a single commit 💡
              </Text>
            </Box>
          </Box>
        </Box>

        {/* Form Section */}
        <Box className="form-section" sx={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          padding: '0 20px 40px 20px' 
        }}>
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            className="new-vault-form"
            sx={{ 
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Form content remains the same but with updated styling */}
            
            {/* Vault Name Section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Text sx={{ 
                  fontWeight: 'bold', 
                  color: '#24292e',
                  fontSize: 18,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  🏛️ Vault Name 
                  <span style={{ color: '#ff4757', marginLeft: '4px' }}>*</span>
                </Text>
                
                {/* Tooltip */}
                <Box sx={{ position: 'relative', ml: 2 }}>
                  <Box
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    sx={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#7c3aed',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'help',
                      '&:hover': {
                        backgroundColor: '#6d28d9',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    ?
                  </Box>
                  
                  {showTooltip && (
                    <Box sx={{
                      position: 'absolute',
                      top: '25px',
                      left: '-150px',
                      backgroundColor: '#2d3748',
                      color: 'white',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      width: '280px',
                      zIndex: 1000,
                      boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-6px',
                        left: '150px',
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#2d3748',
                        transform: 'rotate(45deg)'
                      }
                    }}>
                      <Text sx={{ fontWeight: 'bold', mb: 1, color: '#fff' }}>Naming Guidelines:</Text>
                      <Text sx={{ fontSize: '12px', color: '#e2e8f0' }}>
                        • 3-50 characters long<br/>
                        • Letters, numbers, hyphens, underscores only<br/>
                        • Cannot start/end with hyphens or underscores<br/>
                        • No consecutive special characters<br/>
                        • Examples: "my-awesome-project", "data_analysis_2024"
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Vault Name Input Container */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                border: `3px solid ${nameValidation.isValid === true ? '#10b981' : nameValidation.isValid === false ? '#ef4444' : '#e1e4e8'}`,
                borderRadius: '16px',
                padding: '4px',
                boxShadow: nameValidation.isValid === true 
                  ? '0 0 0 3px rgba(16, 185, 129, 0.1), 0 4px 12px rgba(16, 185, 129, 0.15)' 
                  : nameValidation.isValid === false 
                    ? '0 0 0 3px rgba(239, 68, 68, 0.1), 0 4px 12px rgba(239, 68, 68, 0.15)'
                    : '0 4px 12px rgba(124, 58, 237, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                {/* Owner Badge */}
                <Box sx={{ 
                  backgroundColor: '#ffffff',
                  border: '2px solid #e1e4e8',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  marginRight: '8px',
                  color: '#586069',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  CyberMage7
                </Box>
                
                {/* Separator */}
                <Text sx={{ 
                  fontSize: 24, 
                  color: '#586069', 
                  margin: '0 8px',
                  fontWeight: 'bold'
                }}>
                  /
                </Text>
                
                {/* Input Field */}
                <Box sx={{ flex: 1, position: 'relative' }}>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="e.g. codify-core 🚀"
                    style={{ 
                      fontSize: 18,
                      fontWeight: 'bold',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#24292e',
                      width: '100%',
                      padding: '12px 16px',
                      fontFamily: 'inherit'
                    }}
                  />
                </Box>
                
                {/* Validation Icon */}
                {nameValidation.isValid !== null && (
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '12px',
                    fontSize: '20px'
                  }}>
                    {nameValidation.isValid ? (
                      <Box sx={{
                        color: '#10b981',
                        animation: 'bounceIn 0.5s ease'
                      }}>
                        ✅
                      </Box>
                    ) : (
                      <Box sx={{
                        color: '#ef4444',
                        animation: 'shake 0.5s ease'
                      }}>
                        ❌
                      </Box>
                    )}
                  </Box>
                )}
              </Box>

              {/* Validation Message */}
              {nameValidation.message && (
                <Box sx={{
                  mt: 2,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: nameValidation.isValid ? '#f0fdf4' : '#fef2f2',
                  border: `2px solid ${nameValidation.isValid ? '#10b981' : '#ef4444'}`,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Text sx={{
                    color: nameValidation.isValid ? '#059669' : '#dc2626',
                    fontSize: 14,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {nameValidation.isValid ? '🎉' : '⚠️'}
                    <span style={{ marginLeft: '8px' }}>{nameValidation.message}</span>
                  </Text>
                </Box>
              )}

              {/* Fun Examples */}
              <Text sx={{ color: '#586069', fontSize: 14, mt: 2, fontStyle: 'italic' }}>
                💡 <strong>Pro tip:</strong> Great vault names tell a story! Try{' '}
                <span 
                  style={{color: '#7c3aed', fontWeight: 'bold', cursor: 'pointer'}} 
                  onClick={() => handleNameChange({target: {value: 'stellar-journey'}})}
                >
                  stellar-journey
                </span>{' '}
                or{' '}
                <span 
                  style={{color: '#7c3aed', fontWeight: 'bold', cursor: 'pointer'}}
                  onClick={() => handleNameChange({target: {value: 'code-wizard-2024'}})}
                >
                  code-wizard-2024
                </span> ✨
              </Text>
            </Box>

            {/* Description */}
            <Box sx={{ mb: 4, width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Text sx={{ 
                  fontWeight: 'bold', 
                  color: '#24292e',
                  fontSize: 18,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  📝 Description 
                  <span style={{ color: '#586069', fontWeight: 'normal', fontSize: '16px', marginLeft: '8px' }}>
                    (optional)
                  </span>
                </Text>
                
                {/* Tooltip for Description */}
                <Box sx={{ position: 'relative', ml: 2 }}>
                  <Box
                    onMouseEnter={() => setShowDescTooltip(true)}
                    onMouseLeave={() => setShowDescTooltip(false)}
                    sx={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'help',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#059669',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    💡
                  </Box>
                  
                  {showDescTooltip && (
                    <Box sx={{
                      position: 'absolute',
                      top: '25px',
                      left: '-120px',
                      backgroundColor: '#1f2937',
                      color: 'white',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      width: '240px',
                      zIndex: 1000,
                      boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                      animation: 'tooltipFadeIn 0.3s ease',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-6px',
                        left: '120px',
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#1f2937',
                        transform: 'rotate(45deg)'
                      }
                    }}>
                      <Text sx={{ fontWeight: 'bold', mb: 1, color: '#fff' }}>✨ Pro Tip:</Text>
                      <Text sx={{ fontSize: '12px', color: '#d1d5db' }}>
                        Add a short description for your repo. This helps others understand what your project is about! 
                        Keep it concise and engaging. 🎯
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Description Input Container */}
              <Box sx={{
                position: 'relative',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '16px',
                padding: '4px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: `2px solid ${formData.description.length > 0 ? '#10b981' : '#e1e4e8'}`,
                transition: 'all 0.3s ease',
                width: '100%',
                '&:focus-within': {
                  borderColor: '#7c3aed',
                  boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.1), 0 8px 25px rgba(124, 58, 237, 0.15)',
                  transform: 'translateY(-2px)'
                }
              }}>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={descriptionPlaceholders[placeholderIndex]}
                  rows={6}
                  className="vault-textarea-enhanced"
                  style={{ 
                    width: '100%',
                    backgroundColor: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    color: '#24292e',
                    fontSize: 16,
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    lineHeight: 1.6,
                    resize: 'vertical',
                    minHeight: '150px',
                    outline: 'none',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.02)'
                  }}
                />
                
                {/* Floating character counter */}
                <Box sx={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '20px',
                  backgroundColor: formData.description.length > 450 ? '#fef2f2' : '#f0f9ff',
                  border: `1px solid ${formData.description.length > 450 ? '#fecaca' : '#bfdbfe'}`,
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  color: formData.description.length > 450 ? '#dc2626' : '#0369a1',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}>
                  {formData.description.length}/500
                </Box>
              </Box>

              {/* Character limit warning */}
              {formData.description.length > 450 && (
                <Box sx={{
                  mt: 2,
                  padding: '8px 12px',
                  borderRadius: '10px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Text sx={{
                    color: '#dc2626',
                    fontSize: 13,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    ⚠️ <span style={{ marginLeft: '6px' }}>
                      {500 - formData.description.length} characters remaining
                    </span>
                  </Text>
                </Box>
              )}

              {/* Fun suggestions */}
              {formData.description.length === 0 && (
                <Box sx={{ mt: 2 }}>
                  <Text sx={{ color: '#586069', fontSize: 14, fontStyle: 'italic', mb: 1 }}>
                    🌟 <strong>Need inspiration?</strong> Try these examples:
                  </Text>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {[
                      "A modern web app for task management",
                      "Open-source library for developers",
                      "Personal project to learn new technologies"
                    ].map((suggestion, index) => (
                      <Box
                        key={index}
                        onClick={() => setFormData({ ...formData, description: suggestion })}
                        sx={{
                          padding: '6px 12px',
                          backgroundColor: '#f3f0ff',
                          border: '1px solid #c4b5fd',
                          borderRadius: '20px',
                          fontSize: '12px',
                          color: '#7c3aed',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: '#ede9fe',
                            borderColor: '#a78bfa',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 2px 8px rgba(124, 58, 237, 0.15)'
                          }
                        }}
                      >
                        {suggestion}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>

            {/* Visibility */}
            <Box sx={{ mb: 4 }}>
              <Text sx={{ 
                fontWeight: 'bold', 
                mb: 2, 
                color: '#24292e',
                fontSize: 18
              }}>
                Visibility
              </Text>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box 
                  className={`visibility-card-light ${formData.visibility ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, visibility: true })}
                  sx={{ 
                    flex: 1, 
                    padding: '24px', 
                    border: formData.visibility ? '3px solid #7c3aed' : '2px solid #e1e4e8',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    backgroundColor: formData.visibility ? '#f3f0ff' : '#ffffff',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                      borderColor: '#7c3aed',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(124, 58, 237, 0.15)'
                    }
                  }}
                >
                  <Text sx={{ 
                    fontWeight: 'bold', 
                    display: 'flex', 
                    alignItems: 'center',
                    color: '#24292e',
                    fontSize: 16,
                    mb: 1
                  }}>
                    <span style={{ marginRight: '12px', fontSize: '24px' }}>🌍</span>
                    Public
                  </Text>
                  <Text sx={{ fontSize: 14, color: '#586069' }}>
                    Anyone on the internet can see this vault. You choose who can commit.
                  </Text>
                </Box>
                <Box 
                  className={`visibility-card-light ${!formData.visibility ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, visibility: false })}
                  sx={{ 
                    flex: 1, 
                    padding: '24px', 
                    border: !formData.visibility ? '3px solid #7c3aed' : '2px solid #e1e4e8',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    backgroundColor: !formData.visibility ? '#f3f0ff' : '#ffffff',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                      borderColor: '#7c3aed',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(124, 58, 237, 0.15)'
                    }
                  }}
                >
                  <Text sx={{ 
                    fontWeight: 'bold', 
                    display: 'flex', 
                    alignItems: 'center',
                    color: '#24292e',
                    fontSize: 16,
                    mb: 1
                  }}>
                    <span style={{ marginRight: '12px', fontSize: '24px' }}>🔒</span>
                    Private
                  </Text>
                  <Text sx={{ fontSize: 14, color: '#586069' }}>
                    You choose who can see and commit to this vault.
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* Primary Language Section */}
            <Box sx={{ mb: 4 }}>
              <Text sx={{ 
                fontWeight: 'bold', 
                mb: 2, 
                color: '#24292e',
                fontSize: 18
              }}>
                Primary Language
                <Text sx={{ fontSize: '0.9rem', color: '#6a737d', ml: 1 }}>*</Text>
              </Text>
              
              {/* Custom Language Dropdown */}
              <div className="custom-language-dropdown" ref={languageDropdownRef}>
                <div 
                  className={`language-dropdown-trigger ${showLanguageDropdown ? 'active' : ''}`}
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  role="button"
                  tabIndex={0}
                  aria-label="Select primary language"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowLanguageDropdown(!showLanguageDropdown);
                    }
                  }}
                >
                  <div className="selected-language">
                    <span className="language-icon">
                      {languages.find(lang => lang.name === formData.primaryLanguage)?.icon || '📁'}
                    </span>
                    <span className="language-name">
                      {formData.primaryLanguage}
                    </span>
                  </div>
                  <div className={`dropdown-arrow ${showLanguageDropdown ? 'open' : ''}`}>
                    ▼
                  </div>
                </div>
                
                {showLanguageDropdown && (
                  <div className="language-dropdown-options">
                    {languages.map((language) => (                        <div
                          key={language.name}
                          className={`language-option ${formData.primaryLanguage === language.name ? 'selected' : ''}`}
                          onClick={() => {
                            setFormData({ ...formData, primaryLanguage: language.name });
                            setShowLanguageDropdown(false);
                          }}
                          role="option"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setFormData({ ...formData, primaryLanguage: language.name });
                              setShowLanguageDropdown(false);
                            }
                          }}
                        >
                        <span className="language-icon">{language.icon}</span>
                        <span className="language-name">{language.name}</span>
                        {formData.primaryLanguage === language.name && (
                          <span className="check-mark">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Box>

            {/* Initialize Options - Enhanced */}
            <Box sx={{ mb: 4 }}>
              <Text sx={{ 
                fontWeight: 'bold', 
                mb: 3, 
                color: '#24292e',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center'
              }}>
                ✨ Initialize this vault with:
                <Box sx={{
                  ml: 2,
                  padding: '4px 12px',
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #0ea5e9',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: '#0369a1',
                  fontWeight: 'normal'
                }}>
                  Optional but recommended
                </Box>
              </Text>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* README Option */}
                <Box 
                  className={`init-option-enhanced ${formData.addReadme ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, addReadme: !formData.addReadme })}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    padding: '20px 24px',
                    borderRadius: '16px',
                    background: formData.addReadme 
                      ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' 
                      : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    border: formData.addReadme ? '3px solid #0ea5e9' : '2px solid #e2e8f0',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: formData.addReadme 
                        ? 'linear-gradient(45deg, rgba(14, 165, 233, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%)'
                        : 'transparent',
                      opacity: formData.addReadme ? 1 : 0,
                      transition: 'opacity 0.3s ease'
                    },
                    '&:hover': { 
                      transform: 'translateY(-3px)',
                      boxShadow: formData.addReadme 
                        ? '0 12px 32px rgba(14, 165, 233, 0.25)' 
                        : '0 8px 25px rgba(124, 58, 237, 0.15)',
                      borderColor: formData.addReadme ? '#0284c7' : '#7c3aed'
                    }
                  }}
                >
                  {/* Custom Animated Checkbox */}
                  <Box sx={{
                    position: 'relative',
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    backgroundColor: formData.addReadme ? '#0ea5e9' : '#ffffff',
                    border: formData.addReadme ? '2px solid #0ea5e9' : '2px solid #d1d5db',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 1,
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: formData.addReadme 
                        ? '0 4px 12px rgba(14, 165, 233, 0.4)' 
                        : '0 4px 12px rgba(124, 58, 237, 0.2)'
                    }
                  }}>
                    {formData.addReadme && (
                      <Box sx={{
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        animation: 'checkBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                      }}>
                        ✓
                      </Box>
                    )}
                  </Box>
                  
                  <Box sx={{ flex: 1, zIndex: 1 }}>
                    <Text sx={{ 
                      color: '#1e293b', 
                      fontWeight: 'bold', 
                      fontSize: 18,
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <span style={{ marginRight: '12px', fontSize: '24px' }}>📄</span>
                      Add a README file
                      {formData.addReadme && (
                        <Box sx={{
                          ml: 2,
                          padding: '2px 8px',
                          backgroundColor: '#dcfdf4',
                          border: '1px solid #10b981',
                          borderRadius: '12px',
                          fontSize: '10px',
                          color: '#059669',
                          fontWeight: 'bold',
                          animation: 'fadeInScale 0.3s ease'
                        }}>
                          SELECTED
                        </Box>
                      )}
                    </Text>
                    <Text sx={{ color: '#64748b', fontSize: 14, lineHeight: 1.5 }}>
                      This is where you can write a long description for your project. 
                      Perfect for explaining what your vault does and how to use it! 📚
                    </Text>
                  </Box>
                </Box>
                
                {/* .gitignore Option */}
                <Box 
                  className={`init-option-enhanced ${formData.addGitignore ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, addGitignore: !formData.addGitignore })}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    padding: '20px 24px',
                    borderRadius: '16px',
                    background: formData.addGitignore 
                      ? 'linear-gradient(135deg, #fef3f2 0%, #fecaca 100%)' 
                      : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    border: formData.addGitignore ? '3px solid #ef4444' : '2px solid #e2e8f0',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: formData.addGitignore 
                        ? 'linear-gradient(45deg, rgba(239, 68, 68, 0.1) 0%, rgba(248, 113, 113, 0.1) 100%)'
                        : 'transparent',
                      opacity: formData.addGitignore ? 1 : 0,
                      transition: 'opacity 0.3s ease'
                    },
                    '&:hover': { 
                      transform: 'translateY(-3px)',
                      boxShadow: formData.addGitignore 
                        ? '0 12px 32px rgba(239, 68, 68, 0.25)' 
                        : '0 8px 25px rgba(124, 58, 237, 0.15)',
                      borderColor: formData.addGitignore ? '#dc2626' : '#7c3aed'
                    }
                  }}
                >
                  {/* Custom Animated Checkbox */}
                  <Box sx={{
                    position: 'relative',
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    backgroundColor: formData.addGitignore ? '#ef4444' : '#ffffff',
                    border: formData.addGitignore ? '2px solid #ef4444' : '2px solid #d1d5db',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 1,
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: formData.addGitignore 
                        ? '0 4px 12px rgba(239, 68, 68, 0.4)' 
                        : '0 4px 12px rgba(124, 58, 237, 0.2)'
                    }
                  }}>
                    {formData.addGitignore && (
                      <Box sx={{
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        animation: 'checkBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                      }}>
                        ✓
                      </Box>
                    )}
                  </Box>
                  
                  <Box sx={{ flex: 1, zIndex: 1 }}>
                    <Text sx={{ 
                      color: '#1e293b', 
                      fontWeight: 'bold', 
                      fontSize: 18,
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <span style={{ marginRight: '12px', fontSize: '24px' }}>🛑</span>
                      Add .gitignore
                      {formData.addGitignore && (
                        <Box sx={{
                          ml: 2,
                          padding: '2px 8px',
                          backgroundColor: '#fef2f2',
                          border: '1px solid #ef4444',
                          borderRadius: '12px',
                          fontSize: '10px',
                          color: '#dc2626',
                          fontWeight: 'bold',
                          animation: 'fadeInScale 0.3s ease'
                        }}>
                          SELECTED
                        </Box>
                      )}
                    </Text>
                    <Text sx={{ color: '#64748b', fontSize: 14, lineHeight: 1.5 }}>
                      Choose which files not to track from a list of templates. 
                      Keeps your vault clean and organized! 🧹
                    </Text>
                  </Box>
                </Box>

                {/* .gitignore Template Dropdown - Only show when .gitignore is enabled */}
                {formData.addGitignore && (
                  <Box sx={{
                    ml: 4,
                    padding: '20px',
                    background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
                    border: '2px solid #ec4899',
                    borderRadius: '12px',
                    animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    <Box>
                      <Text sx={{ 
                        fontWeight: 'bold', 
                        mb: 2, 
                        color: '#1e293b',
                        fontSize: 16,
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        🎯 Choose .gitignore template:
                        <Box sx={{
                          ml: 2,
                          padding: '2px 8px',
                          backgroundColor: '#fef3f2',
                          border: '1px solid #f87171',
                          borderRadius: '12px',
                          fontSize: '10px',
                          color: '#dc2626',
                          fontWeight: 'normal'
                        }}>
                          RECOMMENDED
                        </Box>
                      </Text>
                      
                      {/* Custom Gitignore Dropdown */}
                      <div className="custom-gitignore-dropdown" ref={gitignoreDropdownRef}>                        <div 
                          className={`gitignore-dropdown-trigger ${showGitignoreDropdown ? 'active' : ''}`}
                          onClick={() => setShowGitignoreDropdown(!showGitignoreDropdown)}
                          role="button"
                          tabIndex={0}
                          aria-label="Select gitignore template"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setShowGitignoreDropdown(!showGitignoreDropdown);
                            }
                          }}
                        >
                        <div className="selected-template">
                          <span className="template-icon">
                            {gitignoreTemplates.find(template => template.name === formData.gitignoreTemplate)?.icon || '📁'}
                          </span>
                          <div className="template-info">
                            <span className="template-name">
                              {formData.gitignoreTemplate}
                            </span>
                            <span className="template-description">
                              {gitignoreTemplates.find(template => template.name === formData.gitignoreTemplate)?.description || ''}
                            </span>
                          </div>
                        </div>
                        <div className={`dropdown-arrow ${showGitignoreDropdown ? 'open' : ''}`}>
                          ▼
                        </div>
                      </div>
                      
                      {showGitignoreDropdown && (
                        <div className="gitignore-dropdown-options">
                          {gitignoreTemplates.map((template) => (
                            <div
                              key={template.name}
                              className={`template-option ${formData.gitignoreTemplate === template.name ? 'selected' : ''}`}
                              onClick={() => {
                                setFormData({ ...formData, gitignoreTemplate: template.name });
                                setShowGitignoreDropdown(false);
                              }}
                              role="option"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setFormData({ ...formData, gitignoreTemplate: template.name });
                                  setShowGitignoreDropdown(false);
                                }
                              }}
                            >
                              <span className="template-icon">{template.icon}</span>
                              <div className="template-info">
                                <span className="template-name">{template.name}</span>
                                <span className="template-description">{template.description}</span>
                              </div>
                              {formData.gitignoreTemplate === template.name && (
                                <span className="check-mark">✓</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Error Display */}
            {errors.general && (
              <Box sx={{
                padding: '12px 16px',
                backgroundColor: '#ffeaea',
                border: '1px solid #ff6b6b',
                borderRadius: '8px',
                color: '#d63031',
                fontSize: '14px',
                fontWeight: 'bold',
                marginTop: '16px'
              }}>
                ❌ {errors.general}
              </Box>
            )}

            {/* Action Buttons */}
            <Box sx={{ 
              display: 'flex', 
              gap: 3, 
              justifyContent: 'flex-end',
              pt: 3,
              borderTop: '2px solid #e1e4e8'
            }}>
              <Button 
                variant="outline"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
                sx={{ 
                  padding: '14px 28px',
                  fontSize: 16,
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  border: '2px solid #e1e4e8',
                  color: '#586069',
                  '&:hover': {
                    backgroundColor: '#f6f8fa',
                    borderColor: '#7c3aed'
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="primary"
                type="submit"
                disabled={loading}
                className="create-vault-btn-light"
                sx={{ 
                  padding: '14px 32px',
                  fontSize: 16,
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  border: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #6d28d9, #9333ea)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(124, 58, 237, 0.3)'
                  }
                }}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner-light"></span>
                    Creating vault...
                  </>
                ) : (
                  '🚀 Create vault'
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NewVault;