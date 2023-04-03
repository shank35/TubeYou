import React, { useState } from "react";
import menuImage from "../../assets/icons/menu.png";
import youtubeLogo from "../../assets/icons/youtube_logo.png";
import search from "../../assets/icons/search.png";
import profileDefault from "../../assets/profile/default.png";
import upload from "../../assets/icons/upload.png"

import "./reset.css";
import "./Navigation.css";

function Navigation() {
  const [navVisible, setNavVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform search using the searchTerm
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="body">
      <div id="pageContainer">
        <div id="mastHeadContainer">
          <button className="navShowHide" onClick={toggleNav}>
            <img src={menuImage} alt="menu" />
          </button>

          <a className="logoContainer" href="/">
            <img src={youtubeLogo} alt="youtube logo" />
          </a>

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

          <div class="rightIcons">
            <a href="#">
              <img class="upload" src={upload}/>
            </a>

            <a href="#">
              <img class="upload" src={profileDefault}/>
            </a>
            </div>

        </div>

        {navVisible && <div id="sideNavContainer">Actual SideBar</div>}

      </div>
    </div>
  );
}

export default Navigation;