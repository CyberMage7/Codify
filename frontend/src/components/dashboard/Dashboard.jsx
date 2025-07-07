import React, { useState } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";
import { Box, Text, ButtonGroup, Button } from "@primer/react";
import { Link, useNavigate } from "react-router-dom";

// Dummy data for the demo
const dummyVaults = [
  { 
    id: 1, 
    name: 'codify-core', 
    visibility: false, 
    updatedAt: '1h ago',
    description: 'Core functionality for the Codify application',
    language: 'JavaScript',
    stars: 24,
    forks: 8
  },
  { 
    id: 2, 
    name: 'codify-docs', 
    visibility: true, 
    updatedAt: '2d ago',
    description: 'Documentation and guides for Codify',
    language: 'TypeScript',
    stars: 12,
    forks: 3
  },
  { 
    id: 3, 
    name: 'test-repo', 
    visibility: false, 
    updatedAt: '5d ago',
    description: 'Testing repository for new features',
    language: 'Python',
    stars: 5,
    forks: 1
  }
];

const dummyCollaborations = [
  { 
    id: 4, 
    name: 'react-ui-lib', 
    owner: 'Alice',
    updatedAt: '1d ago',
    role: 'Collaborator',
    language: 'TypeScript',
    stars: 18
  },
  { 
    id: 5, 
    name: 'devtools-playground', 
    owner: 'Bob',
    updatedAt: '3d ago',
    role: 'Contributor',
    language: 'JavaScript',
    stars: 12
  },
  { 
    id: 6, 
    name: 'data-viz-components', 
    owner: 'Charlie',
    updatedAt: '1w ago',
    role: 'Maintainer',
    language: 'JavaScript',
    stars: 45
  }
];

const dummyActivity = [
  { 
    id: 1, 
    type: 'commit', 
    vault: 'codify-core', 
    time: '10 mins ago',
    message: 'feat: implement user authentication',
    author: 'Vishwas'
  },
  { 
    id: 2, 
    type: 'issue', 
    number: 12, 
    title: 'Fix routing bug', 
    time: '2h ago',
    tags: ['bug', 'ui'],
    assignee: 'Vishwas'
  },
  { 
    id: 3, 
    type: 'vault', 
    name: 'codify-docs', 
    time: '1d ago',
    tags: ['new', 'js'],
    description: 'Documentation for the Codify project'
  },
  {
    id: 4,
    type: 'commit',
    vault: 'test-repo',
    time: '3d ago',
    message: 'fix: resolve merge conflicts',
    author: 'Vishwas'
  }
];

const dummyIssues = [
  { id: 1, title: 'Fix Navbar Bug', priority: 'high' },
  { id: 2, title: 'Improve Dashboard UI', priority: 'medium' },
  { id: 3, title: 'Add login form validation', priority: 'low' }
];

const dummyEvents = [
  { 
    id: 1, 
    name: 'React India Conference', 
    date: 'Jun 30',
    month: 'Jun',
    day: '30',
    location: 'Mumbai, India',
    type: 'Conference'
  },
  { 
    id: 2, 
    name: 'DevOps Days', 
    date: 'Jul 15',
    month: 'Jul',
    day: '15',
    location: 'Berlin, Germany',
    type: 'Workshop'
  },
  { 
    id: 3, 
    name: 'GraphQL Summit', 
    date: 'Aug 05',
    month: 'Aug',
    day: '05',
    location: 'San Francisco, USA',
    type: 'Summit'
  }
];

const dummySuggestions = [
  { id: 1, name: 'Web3 Developer Summit', trending: true },
  { id: 2, name: 'AI in Production Conference', trending: false },
  { id: 3, name: 'TypeScript Meetup', trending: true }
];

const Dashboard = () => {
  const [userName] = useState('Vishwas');
  const navigate = useNavigate();

  // Component for welcome section
  const WelcomeSection = () => (
    <Box className="welcome-section" sx={{ 
      p: 4, 
      mb: 4,
      position: 'relative',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Box className="welcome-content">
        <Text className="welcome-title" sx={{ 
          fontSize: 28, 
          fontWeight: 'bold', 
          mb: 2,
          color: '#f0f6fc', // Off-white text
          display: 'block',
          textAlign: 'center'
        }}>
          <span className="wave-emoji">👋</span> Welcome back, <span className="user-name">{userName}</span>!
        </Text>
        <Text className="welcome-subtitle" sx={{ 
          fontSize: 16,
          background: 'linear-gradient(90deg, #a3c4f3, #8eecf5)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'block',
          textAlign: 'center'
        }}>
          Ready to push something awesome today?
        </Text>
      </Box>
    </Box>
  );

  // Component for quick actions with modern glowing buttons
  const QuickActionsSection = () => (
    <Box className="quick-actions-row" sx={{ display: 'flex', gap: '20px', mb: 4 }}>
      {/* Quick Actions */}
      <Box className="dashboard-section" sx={{ 
        flex: 1, 
        p: 3, 
        borderRadius: '10px', 
        backgroundColor: '#0d1117',
        border: '1px solid #30363d',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Text sx={{ fontSize: 18, fontWeight: 'bold', mb: 3 }}>Quick Actions</Text>
        
                 {/* Modern button grid */}
         <Box className="modern-button-grid">
           <Box 
             className="modern-button neon-blue" 
             onClick={() => navigate('/new-vault')}
             role="button"
             tabIndex={0}
           >
             <Box className="button-icon">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" fill="currentColor"/>
               </svg>
             </Box>
             <Text className="button-label">New Vault</Text>
             <span className="button-glow"></span>
           </Box>
           
           <Box 
             className="modern-button neon-pink"
             onClick={() => alert('New Issue action')}
             role="button"
             tabIndex={0}
           >
             <Box className="button-icon">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M20 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM19 19H5C4.45 19 4 18.55 4 18V6C4 5.45 4.45 5 5 5H19C19.55 5 20 5.45 20 6V18C20 18.55 19.55 19 19 19ZM11 17H13V15H15V13H13V11H11V13H9V15H11V17ZM7 9H17V7H7V9Z" fill="currentColor"/>
               </svg>
             </Box>
             <Text className="button-label">New Issue</Text>
             <span className="button-glow"></span>
           </Box>
           
           <Box 
             className="modern-button neon-blue"
             onClick={() => alert('Push Changes action')}
             role="button"
             tabIndex={0}
           >
             <Box className="button-icon">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M5 5V19H19V5H5ZM17 17H7V7H17V17ZM16 8H8V10H16V8ZM16 11H8V13H16V11ZM14 14H8V16H14V14Z" fill="currentColor"/>
               </svg>
             </Box>
             <Text className="button-label">Push Changes</Text>
             <span className="button-glow"></span>
           </Box>
           
           <Box 
             className="modern-button neon-pink"
             onClick={() => alert('Pull Latest action')}
             role="button"
             tabIndex={0}
           >
             <Box className="button-icon">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" fill="currentColor"/>
               </svg>
             </Box>
             <Text className="button-label">Pull Latest</Text>
             <span className="button-glow"></span>
           </Box>
         </Box>
      </Box>

      {/* GitHub-style Issues Panel */}
      <Box className="dashboard-section github-issues-panel" sx={{ 
        flex: 1, 
        p: 3, 
        borderRadius: '10px', 
        backgroundColor: '#0d1117',
        border: '1px solid #30363d',
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Text sx={{ fontSize: 18, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <svg className="header-icon" width="20" height="20" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px' }}>
              <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              <path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
            </svg>
            Issues
          </Text>
          <Box className="issue-filter" sx={{ display: 'flex', alignItems: 'center' }}>
            <Text sx={{ fontSize: 12, color: '#8b949e', mr: 1 }}>Filter:</Text>
            <Text sx={{ fontSize: 12, color: '#58a6ff', cursor: 'pointer' }}>Assigned to you</Text>
          </Box>
        </Box>
        
        <Box className="issues-list">
          {/* Issue #1 - Bug */}
          <Box className="issue-card">
            <Box className="issue-header">
              <Box className="issue-title-row">
                <svg className="issue-icon" width="16" height="16" viewBox="0 0 16 16" fill="#f85149">
                  <path fillRule="evenodd" d="M2.343 13.657A8 8 0 1113.657 2.343 8 8 0 012.343 13.657zM6.03 4.97a.75.75 0 00-1.06 1.06L6.94 8 4.97 9.97a.75.75 0 101.06 1.06L8 9.06l1.97 1.97a.75.75 0 101.06-1.06L9.06 8l1.97-1.97a.75.75 0 10-1.06-1.06L8 6.94 6.03 4.97z"></path>
                </svg>
                <Text className="issue-title">Fix authentication token refresh logic</Text>
              </Box>
              <Box className="issue-meta">
                <Text className="issue-number">#42</Text>
                <Text className="issue-date">Opened 2 days ago</Text>
              </Box>
            </Box>
            <Box className="issue-labels">
              <Box className="issue-label bug">bug</Box>
              <Box className="issue-label high">high priority</Box>
            </Box>
            <Box className="issue-description">
              <Text>Token refresh mechanism fails when the user session is about to expire while they're still active.</Text>
            </Box>
            <Box className="issue-footer">
              <Box className="issue-assignee">
                <Box className="avatar-mini"></Box>
                <Text>Assigned to you</Text>
              </Box>
              <Box className="issue-comments">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e">
                  <path fillRule="evenodd" d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12h-4.5a.25.25 0 00-.177.073L5.5 15.44v-2.19a.25.25 0 00-.25-.25h-2.5A1.75 1.75 0 011 11.25v-8.5z"></path>
                </svg>
                <Text>3</Text>
              </Box>
            </Box>
          </Box>
          
          {/* Issue #2 - UI */}
          <Box className="issue-card">
            <Box className="issue-header">
              <Box className="issue-title-row">
                <svg className="issue-icon" width="16" height="16" viewBox="0 0 16 16" fill="#8b949e">
                  <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path>
                </svg>
                <Text className="issue-title">Improve dashboard UI for mobile devices</Text>
              </Box>
              <Box className="issue-meta">
                <Text className="issue-number">#38</Text>
                <Text className="issue-date">Opened 5 days ago</Text>
              </Box>
            </Box>
            <Box className="issue-labels">
              <Box className="issue-label ui">ui</Box>
              <Box className="issue-label medium">medium priority</Box>
            </Box>
            <Box className="issue-description">
              <Text>Dashboard layout breaks on smaller screens. Need to implement responsive design.</Text>
            </Box>
            <Box className="issue-footer">
              <Box className="issue-assignee">
                <Box className="avatar-mini"></Box>
                <Text>Assigned to you</Text>
              </Box>
              <Box className="issue-comments">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e">
                  <path fillRule="evenodd" d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12h-4.5a.25.25 0 00-.177.073L5.5 15.44v-2.19a.25.25 0 00-.25-.25h-2.5A1.75 1.75 0 011 11.25v-8.5z"></path>
                </svg>
                <Text>5</Text>
              </Box>
            </Box>
          </Box>
          
          {/* Issue #3 - Feature */}
          <Box className="issue-card">
            <Box className="issue-header">
              <Box className="issue-title-row">
                <svg className="issue-icon" width="16" height="16" viewBox="0 0 16 16" fill="#3fb950">
                  <path fillRule="evenodd" d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"></path>
                </svg>
                <Text className="issue-title">Add login form validation</Text>
              </Box>
              <Box className="issue-meta">
                <Text className="issue-number">#27</Text>
                <Text className="issue-date">Opened 1 week ago</Text>
              </Box>
            </Box>
            <Box className="issue-labels">
              <Box className="issue-label feature">feature</Box>
              <Box className="issue-label low">low priority</Box>
            </Box>
            <Box className="issue-description">
              <Text>Implement client-side validation for the login form to improve user experience.</Text>
            </Box>
            <Box className="issue-footer">
              <Box className="issue-assignee">
                <Box className="avatar-mini"></Box>
                <Text>Assigned to you</Text>
              </Box>
              <Box className="issue-comments">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e">
                  <path fillRule="evenodd" d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12h-4.5a.25.25 0 00-.177.073L5.5 15.44v-2.19a.25.25 0 00-.25-.25h-2.5A1.75 1.75 0 011 11.25v-8.5z"></path>
                </svg>
                <Text>2</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  // Component for my vaults section - Futuristic UI
  const MyVaultsSection = () => (
    <Box className="dashboard-section futuristic-repos" sx={{ 
      p: 3, 
      mb: 4, 
      borderRadius: '10px', 
      backgroundColor: '#0d1117',
      border: '1px solid #30363d',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background grid effect */}
      <div className="repo-grid-pattern"></div>
      
      {/* Header with icon */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        position: 'relative',
        zIndex: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <svg className="repo-header-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="#58a6ff"/>
          </svg>
          <Text sx={{ fontSize: 18, fontWeight: 'bold', ml: 2 }}>My Vaults</Text>
        </Box>
        <Box className="repo-actions-menu">
          <Text sx={{ fontSize: 12, color: '#58a6ff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '5px' }}>
              <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177a.75.75 0 0 1 .75-.75h2.25v2.25a.75.75 0 0 1-1.5 0v-.325a5.735 5.735 0 0 0-1.897 3.702.75.75 0 1 1-1.493-.149 7.226 7.226 0 0 1 1.486-3.443l-.384.384a.75.75 0 0 1-1.06-1.06l1.5-1.5a.75.75 0 0 1 .53-.22h.013ZM12.53 15.28a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 0 1 0-1.06l1.5-1.5a.75.75 0 1 1 1.06 1.06l-.384.384a7.234 7.234 0 0 0 1.896-3.702.75.75 0 0 1 1.493.149 8.734 8.734 0 0 1-2.465 4.919l.384-.384a.75.75 0 0 1 1.06 1.06l-1.5 1.5a.75.75 0 0 1-.53.22h-.013Z"></path>
            </svg>
            Sort
          </Text>
        </Box>
      </Box>
      
      {/* Repository list */}
      <Box className="repo-list">
        {dummyVaults.map(vault => (
          <Box key={vault.id} className="repo-card">
            <Box className="repo-card-content">
              <Box className="repo-name-row">
                {/* Repository icon with privacy indicator */}
                {vault.visibility ? (
                  <svg className="repo-icon public" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                  </svg>
                ) : (
                  <svg className="repo-icon private" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a4 4 0 0 1 8 0v2h.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-5.5C2 6.784 2.784 6 3.75 6H4Zm8.25 3.5h-8.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25ZM10.5 6V4a2.5 2.5 0 0 0-5 0v2Z"></path>
                  </svg>
                )}
                
                {/* Repository name */}
                <Link to={`/vaults/${vault.id}`} className="repo-name-link">
                  {vault.name}
                </Link>
                
                {/* Privacy badge */}
                <span className={`repo-privacy-badge ${vault.visibility ? 'public' : 'private'}`}>
                  {vault.visibility ? 'Public' : 'Private'}
                </span>
              </Box>
              
              {/* Repository description - placeholder */}
              <Box className="repo-description">
                {vault.description || "No description provided"}
              </Box>
              
              {/* Repository meta information */}
              <Box className="repo-meta">
                {/* Language indicator */}
                <Box className="repo-language">
                  <span className={`language-color ${vault.language?.toLowerCase() || "default"}`}></span>
                  <span>{vault.language || "None"}</span>
                </Box>
                
                {/* Last updated */}
                <Box className="repo-updated">
                  <svg className="repo-meta-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M1.643 3.143.427 1.927A.25.25 0 0 0 0 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 0 0 .177-.427L2.715 4.215a6.5 6.5 0 1 1-1.18 4.458.75.75 0 1 0-1.493.154 8.001 8.001 0 1 0 1.6-5.684ZM7.75 4a.75.75 0 0 1 .75.75v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5A.75.75 0 0 1 7.75 4Z"></path>
                  </svg>
                  <span>Updated {vault.updatedAt}</span>
                </Box>
              </Box>
            </Box>
            
            {/* Glowing effect on hover */}
            <div className="repo-card-glow"></div>
          </Box>
        ))}
      </Box>
      
      {/* View all button */}
      <Box className="view-all-repos" sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="primary" sx={{ 
          backgroundColor: 'transparent', 
          border: '1px solid #58a6ff',
          color: '#58a6ff',
          '&:hover': {
            backgroundColor: 'rgba(88, 166, 255, 0.1)'
          }
        }}>
          View All Vaults
        </Button>
      </Box>
    </Box>
  );

  // Component for collaborating section - Modern indigo/sky blue theme
  const CollaboratingSection = () => (
    <Box className="dashboard-section collab-panel" sx={{ 
      p: 3, 
      mb: 4, 
      borderRadius: '10px', 
      backgroundColor: '#0d1117',
      border: '1px solid #30363d',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background effect */}
      <div className="collab-panel-bg"></div>
      
      {/* Header with icon */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        position: 'relative',
        zIndex: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <svg className="collab-header-icon" width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z" fill="#7dd3fc"/>
          </svg>
          <Text sx={{ fontSize: 18, fontWeight: 'bold', ml: 2 }}>Collaborating On</Text>
        </Box>
        <Box className="collab-actions">
          <Text sx={{ fontSize: 12, color: '#7dd3fc', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '5px' }}>
              <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"></path>
            </svg>
            Add Collaboration
          </Text>
        </Box>
      </Box>
      
      {/* Collaboration list */}
      <Box className="collab-list">
        {dummyCollaborations.map(collab => (
          <Box key={collab.id} className="collab-item">
            <Box className="collab-content">
              <Box className="collab-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                </svg>
              </Box>
              <Box className="collab-details">
                <Box className="collab-name-row">
                  <Text className="collab-name">{collab.name}</Text>
                  <Box className={`collab-role-badge ${collab.role?.toLowerCase() || "collaborator"}`}>
                    {collab.role || "Collaborator"}
                  </Box>
                </Box>
                <Box className="collab-meta">
                  <Box className="collab-owner">
                    <svg className="collab-meta-icon" width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M10.5 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm.061 3.073a4 4 0 10-5.123 0 6.004 6.004 0 00-3.431 5.142.75.75 0 001.498.07 4.5 4.5 0 018.99 0 .75.75 0 101.498-.07 6.005 6.005 0 00-3.432-5.142z"></path>
                    </svg>
                    <span>{collab.owner}</span>
                  </Box>
                  <Box className="collab-language">
                    <span className={`collab-language-color ${collab.language?.toLowerCase() || "default"}`}></span>
                    <span>{collab.language || "None"}</span>
                  </Box>
                  <Box className="collab-last-updated">
                    <svg className="collab-meta-icon" width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"></path>
                    </svg>
                    <span>Updated {collab.updatedAt || '2d ago'}</span>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            <Box className="collab-actions-row">
              <button className="collab-action-btn">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
                <span>View</span>
              </button>
              <button className="collab-action-btn">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                </svg>
                <span>Star</span>
                <span className="collab-star-count">{collab.stars || 0}</span>
              </button>
            </Box>
            
            {/* Item glow effect */}
            <div className="collab-item-glow"></div>
          </Box>
        ))}
      </Box>
      
      {/* View all button */}
      <Box className="view-all-collabs" sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="primary" sx={{ 
          backgroundColor: 'transparent', 
          border: '1px solid #7dd3fc',
          color: '#7dd3fc',
          '&:hover': {
            backgroundColor: 'rgba(125, 211, 252, 0.1)'
          }
        }}>
          View All Collaborations
        </Button>
      </Box>
    </Box>
  );

  // Component for recent activity section - Glowing modern UI
  const RecentActivitySection = () => (
    <Box className="dashboard-section activity-feed" sx={{ 
      p: 3, 
      mb: 4, 
      borderRadius: '10px', 
      backgroundColor: '#0d1117',
      border: '1px solid #30363d',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background effect */}
      <div className="activity-feed-bg"></div>
      
      {/* Header with icon */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        position: 'relative',
        zIndex: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <svg className="activity-header-icon" width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 1.75a.75.75 0 0 0-1.5 0v12.5c0 .414.336.75.75.75h14.5a.75.75 0 0 0 0-1.5H1.5V1.75Z" fill="#58a6ff"/>
            <path d="M3.75 10.5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5ZM3.75 7.5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5ZM3.75 4.5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5ZM7.75 10.5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5ZM7.75 7.5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5ZM7.75 4.5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5ZM11.75 10.5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5ZM11.75 7.5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5ZM11.75 4.5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5Z" fill="#58a6ff"/>
          </svg>
          <Text sx={{ fontSize: 18, fontWeight: 'bold', ml: 2 }}>Developer Activity</Text>
        </Box>
        <Box className="activity-filter">
          <Text sx={{ fontSize: 12, color: '#58a6ff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '5px' }}>
              <path d="M3.5 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9ZM6 6.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM7.5 10.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1Z"></path>
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Z"></path>
            </svg>
            Filter
          </Text>
        </Box>
      </Box>
      
      {/* Activity feed list */}
      <Box className="activity-list">
        {dummyActivity.map(activity => (
          <Box key={activity.id} className="activity-item">
            {activity.type === 'commit' && (
              <Box className="activity-content">
                <Box className="activity-icon commit">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z"></path>
                  </svg>
                </Box>
                <Box className="activity-details">
                  <Box className="activity-header">
                    <Text className="activity-title">New commit</Text>
                    <Text className="activity-time">{activity.time}</Text>
                  </Box>
                  <Box className="activity-message">
                    <span className="commit-message">{activity.message}</span>
                    <span className="commit-tag">to</span>
                    <span className="commit-repo">{activity.vault}</span>
                  </Box>
                </Box>
              </Box>
            )}
            
            {activity.type === 'issue' && (
              <Box className="activity-content">
                <Box className="activity-icon issue">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
                  </svg>
                </Box>
                <Box className="activity-details">
                  <Box className="activity-header">
                    <Text className="activity-title">Issue closed</Text>
                    <Text className="activity-time">{activity.time}</Text>
                  </Box>
                  <Box className="activity-message">
                    <span className="issue-number">#{activity.number}</span>
                    <span className="issue-title">{activity.title}</span>
                  </Box>
                  <Box className="activity-tags">
                    {activity.tags && activity.tags.map((tag, index) => (
                      <span key={index} className={`activity-tag ${tag}`}>{tag}</span>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
            
            {activity.type === 'vault' && (
              <Box className="activity-content">
                <Box className="activity-icon vault">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                  </svg>
                </Box>
                <Box className="activity-details">
                  <Box className="activity-header">
                    <Text className="activity-title">New vault created</Text>
                    <Text className="activity-time">{activity.time}</Text>
                  </Box>
                  <Box className="activity-message">
                    <span className="vault-name">{activity.name}</span>
                  </Box>
                  <Box className="activity-tags">
                    {activity.tags && activity.tags.map((tag, index) => (
                      <span key={index} className={`activity-tag ${tag}`}>{tag}</span>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
            
            {/* Activity item glow effect */}
            <div className="activity-item-glow"></div>
          </Box>
        ))}
      </Box>
      
      {/* View more button */}
      <Box className="view-more-activity" sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="primary" sx={{ 
          backgroundColor: 'transparent', 
          border: '1px solid #58a6ff',
          color: '#58a6ff',
          '&:hover': {
            backgroundColor: 'rgba(88, 166, 255, 0.1)'
          }
        }}>
          View All Activity
        </Button>
      </Box>
    </Box>
  );

  // Component for contribution overview - Cyberpunk Heatmap
  const ContributionSection = () => {
    // Generate contribution data for the heatmap
    const generateContributionData = () => {
      const days = 91; // ~3 months
      const data = [];
      
      for (let i = 0; i < days; i++) {
        // Generate random contribution count (0-10)
        const count = Math.floor(Math.random() * 11);
        
        // Calculate date (going backwards from today)
        const date = new Date();
        date.setDate(date.getDate() - (days - i - 1));
        
        data.push({
          date: date.toISOString().split('T')[0],
          count: count,
          level: count === 0 ? 0 : count < 3 ? 1 : count < 5 ? 2 : count < 8 ? 3 : 4
        });
      }
      
      return data;
    };
    
    const contributionData = generateContributionData();
    
    // Group by week for the grid display
    const weeks = [];
    let currentWeek = [];
    
    contributionData.forEach((day, index) => {
      currentWeek.push(day);
      
      // Start a new week every 7 days
      if ((index + 1) % 7 === 0 || index === contributionData.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    // Get month labels
    const getMonthLabels = () => {
      const months = [];
      let currentMonth = '';
      
      contributionData.forEach(day => {
        const month = new Date(day.date).toLocaleString('default', { month: 'short' });
        if (month !== currentMonth) {
          months.push({ month, index: months.length });
          currentMonth = month;
        }
      });
      
      return months;
    };
    
    const monthLabels = getMonthLabels();
    
    return (
      <Box className="dashboard-section contribution-heatmap" sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: '10px', 
        backgroundColor: '#1e1b2e', // Dark indigo background
        border: '1px solid #30363d',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}>
        {/* Background grid effect */}
        <div className="heatmap-grid-bg"></div>
        
        {/* Header with icon */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '750px'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <svg className="heatmap-header-icon" width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.78 9.72a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018L6.75 7.043V12.5a.75.75 0 01-1.5 0v-8a.75.75 0 01.75-.75h8a.75.75 0 010 1.5H9.81l1.97 1.97a.749.749 0 010 1.06z" fill="#ff79c6"/>
            </svg>
            <Text sx={{ fontSize: 18, fontWeight: 'bold', ml: 2 }}>Contribution Heatmap</Text>
          </Box>
          <Box className="heatmap-legend">
            <Text sx={{ fontSize: 12, color: '#8b949e', mr: 2, display: 'inline-block' }}>Less</Text>
            {[0, 1, 2, 3, 4].map(level => (
              <Box 
                key={level} 
                className={`heatmap-legend-item level-${level}`}
                sx={{ display: 'inline-block', width: '12px', height: '12px', marginRight: '3px', borderRadius: '2px' }}
              ></Box>
            ))}
            <Text sx={{ fontSize: 12, color: '#8b949e', ml: 1, display: 'inline-block' }}>More</Text>
          </Box>
        </Box>
        
        {/* Centered container for heatmap */}
        <Box className="heatmap-container" sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Month labels */}
          <Box className="heatmap-months" sx={{ display: 'flex', mb: 1, width: '100%', justifyContent: 'center', maxWidth: '750px' }}>
            {monthLabels.map(month => (
              <Text 
                key={month.index} 
                sx={{ 
                  fontSize: 12, 
                  color: '#8b949e',
                  width: `${month.index === monthLabels.length - 1 ? 'auto' : '60px'}`
                }}
              >
                {month.month}
              </Text>
            ))}
          </Box>
          
          {/* Day labels and grid container */}
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', maxWidth: '750px' }}>
            <Box className="heatmap-days" sx={{ display: 'flex', flexDirection: 'column', mr: 1, pt: '5px' }}>
              {['Mon', 'Wed', 'Fri'].map(day => (
                <Text 
                  key={day} 
                  sx={{ 
                    fontSize: 10, 
                    color: '#8b949e',
                    height: '27px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {day}
                </Text>
              ))}
            </Box>
            
            {/* Contribution grid */}
            <Box className="heatmap-grid">
              {weeks.map((week, weekIndex) => (
                <Box key={weekIndex} className="heatmap-week">
                  {week.map(day => (
                    <Box 
                      key={day.date} 
                      className={`heatmap-day level-${day.level}`}
                      title={`${day.date}: ${day.count} contributions`}
                    >
                      <span className="heatmap-tooltip">
                        {day.count} contributions on {new Date(day.date).toLocaleDateString()}
                      </span>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        
        {/* Stats summary */}
        <Box className="heatmap-stats" sx={{ mt: 3, textAlign: 'center', width: '100%', maxWidth: '750px' }}>
          <Text sx={{ fontSize: 14, color: '#8b949e' }}>
            <span className="heatmap-stats-highlight">{contributionData.reduce((sum, day) => sum + day.count, 0)}</span> contributions in the last 3 months
          </Text>
        </Box>
      </Box>
    );
  };

  // Helper function to generate random colors for the heatmap
  const getRandomColor = () => {
    const colors = ['#0e4429', '#006d32', '#26a641', '#39d353', '#161b22'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Component for upcoming events and suggestions - Elegant UI Card
  const EventsSection = () => (
    <Box className="dashboard-section events-card" sx={{ 
      p: 3, 
      mb: 4, 
      borderRadius: '10px', 
      backgroundColor: '#1e1333', // Dark purple background
      border: '1px solid rgba(149, 128, 255, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background gradient effect */}
      <div className="events-card-bg"></div>
      
      {/* Header with icon */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        position: 'relative',
        zIndex: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <svg className="events-header-icon" width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0zm5.5 6H5.75a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5zm0 3H5.75a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5z" fill="#9580ff"/>
          </svg>
          <Text sx={{ fontSize: 18, fontWeight: 'bold', ml: 2 }}>Upcoming Events</Text>
        </Box>
        <Box className="events-view-toggle">
          <Text sx={{ fontSize: 12, color: '#9580ff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '5px' }}>
              <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"></path>
            </svg>
            View All
          </Text>
        </Box>
      </Box>
      
      {/* Events list */}
      <Box className="events-list">
        {dummyEvents.map(event => (
          <Box key={event.id} className="event-item">
            <Box className="event-content">
              <Box className="event-date-badge">
                <Text className="event-month">{event.month || 'Jun'}</Text>
                <Text className="event-day">{event.day || event.date.split(' ')[0]}</Text>
              </Box>
              <Box className="event-details">
                <Text className="event-name">{event.name}</Text>
                <Box className="event-meta">
                  {event.location && (
                    <Box className="event-location">
                      <svg className="event-meta-icon" width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path>
                      </svg>
                      <span>{event.location}</span>
                    </Box>
                  )}
                  {event.type && (
                    <Box className={`event-type ${event.type.toLowerCase()}`}>
                      {event.type}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            
            {/* Event item accent line */}
            <div className="event-accent-line"></div>
          </Box>
        ))}
      </Box>
      
      {/* Suggested events section */}
      <Box className="suggested-events">
        <Text className="suggested-title">Recommended for you</Text>
        <Box className="suggested-list">
          {dummySuggestions.map(suggestion => (
            <Box key={suggestion.id} className="suggested-item">
              <svg className="suggested-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm4.879-2.773 4.264 2.559a.25.25 0 0 1 0 .428l-4.264 2.559A.25.25 0 0 1 6 10.559V5.442a.25.25 0 0 1 .379-.215Z"></path>
              </svg>
              <Text className="suggested-name">{suggestion.name}</Text>
              {suggestion.trending && <span className="trending-badge">Trending</span>}
            </Box>
          ))}
        </Box>
      </Box>
      
      {/* Call to action button */}
      <Box className="events-cta" sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="primary" sx={{ 
          backgroundColor: 'transparent', 
          border: '1px solid #9580ff',
          color: '#9580ff',
          '&:hover': {
            backgroundColor: 'rgba(149, 128, 255, 0.1)'
          }
        }}>
          Discover More Events
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Navbar />
      <Box className="dashboard-container" sx={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Welcome Section */}
        <WelcomeSection />
        
        {/* Quick Actions and Assigned Issues */}
        <QuickActionsSection />
        
        {/* My Vaults */}
        <MyVaultsSection />
        
        {/* Collaborating On */}
        <CollaboratingSection />
        
        {/* Recent Activity */}
        <RecentActivitySection />
        
        {/* Contribution Overview */}
        <ContributionSection />
        
        {/* Upcoming Events */}
        <EventsSection />
      </Box>
    </>
  );
};

export default Dashboard;
