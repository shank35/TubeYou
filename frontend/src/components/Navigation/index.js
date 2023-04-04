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
            <i className="fa-sharp fa-solid fa-bars"></i>
          </button>
          {navVisible && (
            <div className="modalContainer">
              <div className="modalContent">
                <div className="modalHeader">
                  <button className="modalButton" onClick={() => setNavVisible(false)}>
                    <i className="fa-sharp fa-solid fa-bars"></i>
                  </button>
                  <a className="modalLogoContainer" href="/">
                    <img src={youtubeLogo} alt="youtube logo" />
                  </a>
                </div>
                <div className="modalBody">
                  {/* Add YouTube-like sidebar menu items here */}
                  <ul className="sidebarMenu">
                    <li className="sidebarMenuItem">
                    <i className="fa-sharp fa-solid fa-house"></i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home
                    </li>
                    <li className="sidebarMenuItem">
                      <i class="fa-solid fa-address-book"></i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Subscriptions
                    </li>
                    <li className="sidebarLine"></li>
                    <li className="sidebarMenuItem">
                    <i class="fa-solid fa-book"></i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Library
                      </li>
                    <li className="sidebarMenuItem">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;History
                    </li>
                    <li className="sidebarMenuItem">
                      <i className="fa-solid fa-video"></i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your Videos
                    </li>
                    <li className="sidebarMenuItem">
                      <i class="fa-solid fa-clock"></i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Watch Later
                    </li>
                    <li className="sidebarMenuItem">
                      <i class="fa-solid fa-thumbs-up"></i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Like Videos
                    </li>
                    <li className="sidebarLine"></li>
                    <li className="sidebarHeader">
                      Subscriptions
                    </li>
                    <li className="sidebarMenuItem">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Channel 1
                    </li>
                    <li className="sidebarMenuItem">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Channel 2
                    </li>
                    <li className="sidebarMenuItem">
                      <i class="fa-solid fa-circle-plus"></i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Browse Channels
                    </li>
                    <li className="sidebarLine"></li>
                    <li className="sidebarHeader">
                      Subscriptions
                    </li>
                    <li className="sidebarMenuItem">
                      <i class="fa-solid fa-fire"></i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trending
                    </li>
                    <li className="sidebarLine"></li>
                    <li className="sidebarMenuItem">
                      <i class="fa-solid fa-gear"></i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Settings
                    </li>
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
