import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import search from "../../assets/icons/search.png";
import "./SearchBar.css";

export function SearchResults({ location }) {
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("term");
  const videos = location.state?.videos || [];

  return (
    <div>
      <h1>Search results for "{searchTerm}"</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>{video.title}</li>
        ))}
      </ul>
    </div>
  );
}


function SearchBar() {
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/videos?search=${searchTerm}`);
    const data = await response.json();
    history.push(`/search?term=${searchTerm}`, { videos: data.videos });
  };
  

  return (
    <div className="searchBarContainer">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchBar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search videos by title..."
        />
        <button type="submit" className="searchButton">
          <img src={search} alt="search icon" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
