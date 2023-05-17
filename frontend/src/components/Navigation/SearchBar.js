import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import video2 from "../../components/HomePage/video2.png";

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
            <Link to={`/videos/${video.id}`}>
              <img className="thumbnail" src={video.thumbnail_url || video2} alt="Video thumbnail" />
              <div className="videoInfo">
                  <h3 className="videoTitle">{video.title}</h3>
                  <p className="videoChannel">{video.authorUsername}</p>
                  <p className="videoViews">
                    {video.views} views • {video.updated_at}
                  </p>
                </div>
            </Link>
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
    const response = await fetch(`/api/videos?search=${searchTerm}`);
    const data = await response.json();
    
    // Convert the object into an array of video objects
    const videosArray = Object.values(data.videos);
    
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
