import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { searchVideos } from "../../actions/searchActions";

import search from "../../assets/icons/search.png";
import "./SearchBar.css";
import "./SearchResults.css";

export function SearchResults({ location }) {
  const videos = useSelector((state) => state.search.videos);
  const searchTerm = new URLSearchParams(location.search).get("term");

  return (
    <div className="searchResultsContainer">
      <h1>Search results for "{searchTerm}"</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <Link to={`/videos/${video.id}`}>{video.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


function SearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/videos?search=${searchTerm}`);
    const data = await response.json();
    console.log("Data:", data);
    
    // Convert the object into an array of video objects
    const videosArray = Object.values(data);
    
    dispatch(searchVideos(videosArray));
    history.push(`/search?term=${searchTerm}`);
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
