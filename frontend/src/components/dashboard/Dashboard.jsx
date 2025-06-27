import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [suggestedrepositories, setsuggestedrepositories] = useState([]);
  const [searchResults, setsearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/repo/user/${userId}`
        );

        const data = await response.json();
        setRepositories(data.repositories);
      } catch (error) {
        console.error("Error while fetching repositories: ", error);
      }
    };
    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/all`);

        const data = await response.json();
        setsuggestedrepositories(data);
      } catch (error) {
        console.error("Error while fetching repositories: ", error);
      }
    };
    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
      setsearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setsearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <> <Navbar /> 
    <section id="dashboard">
      <aside>
        <h3>Suggest Repositiories</h3>
        {suggestedrepositories.map((repo) => {
          return (
            <div key={repo._id}>
              <h4>{repo.name}</h4>
              <h4>{repo.description}</h4>
            </div>
          );
        })}
      </aside>
      <main>
        <h3>My Repositiories</h3>
        <div id="search">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search..."
            onChange={(e) => setsearchQuery(e.target.value)}
          />
        </div>
        {searchResults.map((repo) => {
          return (
            <div key={repo._id}>
              <h4>{repo.name}</h4>
              <h4>{repo.description}</h4>
            </div>
          );
        })}
      </main>
      <aside>
        <h3>Upcoming Events</h3>
        <ul>
          <li>
            <p>Tech Conference - Dec 15</p>
          </li>
          <li>
            <p>Developer Meetup - Dec 25</p>
          </li>
          <li>
            <p>React Summit - Jan 5</p>
          </li>
        </ul>
      </aside>
    </section>
    </>
  );
};

export default Dashboard;
