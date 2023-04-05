import React, { useState } from "react";
import search from "../../assets/icons/search.png";
import "./SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="searchBarContainer">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchBar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit" className="searchButton">
          <img src={search} alt="search icon" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
