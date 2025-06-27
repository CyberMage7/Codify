import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Navbar";
import { Box, Text, ButtonGroup, Button, UnderlineNav, Breadcrumbs } from "@primer/react";
import "./repo.css";

const RepoView = () => {
  const { repoId } = useParams();
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/repo/${repoId}`);
        const data = await response.json();
        setRepository(data);
        
        // Mock files for demonstration
        setFiles([
          { name: "README.md", type: "file", lastUpdated: "2 days ago" },
          { name: "package.json", type: "file", lastUpdated: "5 days ago" },
          { name: "src", type: "directory", lastUpdated: "1 day ago" },
          { name: "public", type: "directory", lastUpdated: "1 week ago" },
          { name: ".gitignore", type: "file", lastUpdated: "2 weeks ago" },
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repository:", error);
        setLoading(false);
      }
    };

    fetchRepository();
  }, [repoId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Box sx={{ maxWidth: 1280, margin: "0 auto", padding: "20px", textAlign: "center" }}>
          <Text>Loading repository...</Text>
        </Box>
      </>
    );
  }

  if (!repository) {
    return (
      <>
        <Navbar />
        <Box sx={{ maxWidth: 1280, margin: "0 auto", padding: "20px", textAlign: "center" }}>
          <Text>Repository not found</Text>
          <Link to="/">
            <Button variant="primary" sx={{ mt: 3 }}>Back to Dashboard</Button>
          </Link>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box className="repo-container">
        <Box className="repo-header">
          <Breadcrumbs>
            <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href={`/user/${repository.owner}`}>{repository.owner}</Breadcrumbs.Item>
            <Breadcrumbs.Item selected>{repository.name}</Breadcrumbs.Item>
          </Breadcrumbs>
          
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Text sx={{ fontSize: 24, fontWeight: "bold", mr: 2 }}>{repository.name}</Text>
              <Box sx={{ px: 2, py: 1, borderRadius: "2em", backgroundColor: repository.visibility ? "#238636" : "#da3633", fontSize: 12 }}>
                {repository.visibility ? "Public" : "Private"}
              </Box>
            </Box>
            
            <ButtonGroup>
              <Button>Watch</Button>
              <Button>Star</Button>
              <Button>Fork</Button>
            </ButtonGroup>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <UnderlineNav aria-label="Repository">
              <UnderlineNav.Item 
                href="#code" 
                aria-current={activeTab === "code" ? "page" : undefined}
                onSelect={(e) => { e.preventDefault(); setActiveTab("code"); }}
              >
                Code
              </UnderlineNav.Item>
              <UnderlineNav.Item 
                href="#issues" 
                aria-current={activeTab === "issues" ? "page" : undefined}
                onSelect={(e) => { e.preventDefault(); setActiveTab("issues"); }}
              >
                Issues
              </UnderlineNav.Item>
              <UnderlineNav.Item 
                href="#pull-requests" 
                aria-current={activeTab === "pull-requests" ? "page" : undefined}
                onSelect={(e) => { e.preventDefault(); setActiveTab("pull-requests"); }}
              >
                Pull Requests
              </UnderlineNav.Item>
              <UnderlineNav.Item 
                href="#settings" 
                aria-current={activeTab === "settings" ? "page" : undefined}
                onSelect={(e) => { e.preventDefault(); setActiveTab("settings"); }}
              >
                Settings
              </UnderlineNav.Item>
            </UnderlineNav>
          </Box>
        </Box>
        
        <Box className="repo-content">
          {activeTab === "code" && (
            <>
              <Box className="repo-about" sx={{ mb: 4, p: 3, borderRadius: "6px", border: "1px solid #30363d" }}>
                <Text sx={{ fontSize: 16, fontWeight: "bold", mb: 2 }}>About</Text>
                <Text sx={{ color: "#8b949e", mb: 3 }}>
                  {repository.description || "No description provided"}
                </Text>
              </Box>
              
              <Box className="file-explorer" sx={{ borderRadius: "6px", border: "1px solid #30363d", overflow: "hidden" }}>
                <Box sx={{ p: 2, borderBottom: "1px solid #30363d", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Text sx={{ fontWeight: "bold" }}>Files</Text>
                  <ButtonGroup>
                    <Button size="small">Create new file</Button>
                    <Button size="small">Upload files</Button>
                  </ButtonGroup>
                </Box>
                
                <Box className="file-list">
                  {files.map((file, index) => (
                    <Box 
                      key={index} 
                      className="file-item" 
                      sx={{ 
                        p: 2, 
                        borderBottom: index < files.length - 1 ? "1px solid #30363d" : "none",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        "&:hover": { backgroundColor: "#161b22" }
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <span className={`file-icon ${file.type}`}></span>
                        <Text sx={{ ml: 2, color: file.type === "directory" ? "#58a6ff" : "#c9d1d9" }}>
                          {file.name}
                        </Text>
                      </Box>
                      <Text sx={{ color: "#8b949e", fontSize: 14 }}>
                        {file.lastUpdated}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          )}
          
          {activeTab === "issues" && (
            <Box sx={{ textAlign: "center", py: 5 }}>
              <Text sx={{ fontSize: 18, mb: 3 }}>Issues will be displayed here</Text>
              <Button variant="primary">Create new issue</Button>
            </Box>
          )}
          
          {activeTab === "pull-requests" && (
            <Box sx={{ textAlign: "center", py: 5 }}>
              <Text sx={{ fontSize: 18, mb: 3 }}>Pull requests will be displayed here</Text>
              <Button variant="primary">Create pull request</Button>
            </Box>
          )}
          
          {activeTab === "settings" && (
            <Box sx={{ textAlign: "center", py: 5 }}>
              <Text sx={{ fontSize: 18, mb: 3 }}>Repository settings</Text>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RepoView; 