import React, { useState } from "react";

import menuImage from "../../assets/icons/menu.png";
import youtubeLogo from "../../assets/icons/youtube_logo.png";
import search from "../../assets/icons/search.png";
import profileDefault from "../../assets/profile/default.png";
import upload from "../../assets/icons/upload.png";
import "./reset.css";
import "./Navigation.css";

function Navigation() {
  const [navVisible, setNavVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleMenuClick = () => {
    setNavVisible(true);
  };

  return (
    <div className="body">
      <div id="pageContainer">
        <div id="mastHeadContainer">
          <button onClick={handleMenuClick}>
            <img src={menuImage} alt="menu" />
          </button>
          {navVisible && (
            <div className="modalContainer">
              <div className="modalContent">
                <div className="modalHeader">
                  <button onClick={() => setNavVisible(false)}>X</button>
                </div>
                <div className="modalBody">
                  {/* Add YouTube-like sidebar menu items here */}
                  <ul className="sidebarMenu">
                    <li className="sidebarMenuItem">Home</li>
                    <li className="sidebarMenuItem">Shorts</li>
                    <li className="sidebarMenuItem">Subscriptions</li>
                    <li>---------</li>
                    <li className="sidebarMenuItem">Library</li>
                    <li className="sidebarMenuItem">History</li>
                    <li className="sidebarMenuItem">Your Videos</li>
                    <li className="sidebarMenuItem">Watch Later</li>
                    <li className="sidebarMenuItem">Like Videos</li>
                    <li>---------</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

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

          <div className="rightIcons">
            <a href="/">
              <img className="upload" src={upload} alt="Upload" />
            </a>

            <a href="/">
              <img className="upload" src={profileDefault} alt="Profile" />
            </a>
          </div>
        </div>

        <div
          id="mainSectionContainer"
          className={navVisible ? "modalOpen" : ""}
        >
          Main Section
        </div>
      </div>
    </div>
  );

}

export default Navigation;
