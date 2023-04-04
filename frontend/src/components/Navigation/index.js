import React, { useState, useEffect } from "react";

import youtubeLogo from "../../assets/icons/youtube_logo.png";
import search from "../../assets/icons/search.png";
import profileDefault from "../../assets/profile/default.png";
import upload from "../../assets/icons/upload.png";
import "./reset.css";
import "./Navigation.css";

function Navigation() {
  const [navVisible, setNavVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleMenuClick = () => {
    setNavVisible(true);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modalContainer")) {
      setNavVisible(false);
    }
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const profileOutsideCLick = (e) => {
    if (!e.target.closest('.profileDropdown') && !e.target.closest('.profileContainer')) {
      setProfileDropdownVisible(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('click', profileOutsideCLick);
    return () => {
      document.removeEventListener('click', profileOutsideCLick);
    };
  }, []);

  useEffect(() => {
    fetch('/users.json')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  }, []);
  
  

  return (
    <div className="body">
      <div id="pageContainer">
        <div id="mastHeadContainer">
          <button className="navButton" onClick={handleMenuClick}>
            <i className="fa-sharp fa-solid fa-bars"></i>
          </button>
          {navVisible && (
            <div className="modalContainer" onClick={handleOutsideClick}>
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
                      <span className="material-symbols-outlined sidebarMenuIcon">home</span>
                      <button className="sidebarText">Home</button>                      
                    </li>
                    <li className="sidebarMenuItem">
                      <span className="material-symbols-outlined sidebarMenuIcon">subscriptions</span>
                      <button className="sidebarText">Subscriptions</button>
                    </li>
                    <li className="sidebarLine"></li>
                    <li className="sidebarMenuItem">
                      <span class="material-symbols-outlined sidebarMenuIcon">video_library</span>
                      <button className="sidebarText">Library</button>
                    </li>
                    <li className="sidebarMenuItem">
                      <span class="material-symbols-outlined sidebarMenuIcon">history</span>
                      <button className="sidebarText">History</button>
                    </li>
                    <li className="sidebarMenuItem">
                      <span class="material-symbols-outlined sidebarMenuIcon">smart_display</span>
                      <button className="sidebarText">Your Videos</button>
                    </li>
                    <li className="sidebarMenuItem">
                      <span class="material-symbols-outlined sidebarMenuIcon">schedule</span>
                      <button className="sidebarText">Watch Later</button>
                    </li>
                    <li className="sidebarMenuItem">
                      <span class="material-symbols-outlined sidebarMenuIcon">thumb_up</span>
                      <button className="sidebarText">Like Videos</button>
                    </li>
                    <li className="sidebarLine"></li>
                    <li className="sidebarHeader sidebarMenuIcon">
                      <span className="sidebarText">Subscriptions</span>
                    </li>
                    <li className="sidebarMenuItem">
                      <span class="material-symbols-outlined sidebarMenuIcon">person</span>
                      <button className="sidebarText">Channel 1</button>
                    </li>
                    <li className="sidebarMenuItem">
                      <span class="material-symbols-outlined sidebarMenuIcon">person</span>
                      <button className="sidebarText">Channel 2</button>
                    </li>
                    <li className="sidebarMenuItem">
                      <span class="material-symbols-outlined sidebarMenuIcon">add_circle</span>  
                      <button className="sidebarText">Browse Channels</button>
                    </li>
                    <li className="sidebarLine"></li>
                    <li className="sidebarHeader sidebarMenuIcon">
                      <span className="sidebarText">Explore</span>
                    </li>
                    <li className="sidebarMenuItem">
                      <span class="material-symbols-outlined sidebarMenuIcon">local_fire_department</span>
                      <button className="sidebarText">Trending</button>                 
                    </li>
                    <li className="sidebarLine"></li>
                    <li className="sidebarMenuItem">
                      <span className="material-symbols-outlined sidebarMenuIcon">settings</span>                    
                      <button className="sidebarText">Settings</button>
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

            <div className="profile">
              <button className="profileContainer" onClick={toggleProfileDropdown}>
                <img className="profileImage" src={profileDefault} alt="Profile" />
              </button>
              {profileDropdownVisible && (
                <div className="profileDropdown">
                  <div className="profileHeader">
                    <img className="profileImage" src={profileDefault} alt="Profile" />
                    <div className="profileInfo">
                      <p className="profileName">John Doe</p>
                      <p className="profileEmail">john.doe@example.com</p>
                    </div>
                  </div>
                  <button className="dropdownButton">Your channel</button>
                  <button className="dropdownButton">Sign out</button>
                  <hr className="dropdownDivider" />
                  <button className="dropdownButton">Dark mode</button>
                  <hr className="dropdownDivider" />
                  <button className="dropdownButton">Settings</button>
                </div>
              )}
            </div>
                


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
