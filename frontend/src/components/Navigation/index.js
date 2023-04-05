import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";
import { logout } from '../../store/session';

import { getUsername, getEmail } from '../../store/session';

import youtubeLogo from "../../assets/icons/youtube_logo.png";
import search from "../../assets/icons/search.png";
import profileDefault from "../../assets/profile/default.png";
import upload from "../../assets/icons/upload.png";
import "./reset.css";
import "./Navigation.css";

function Navigation() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [navVisible, setNavVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const username = useSelector(state => state.session.user?.username);
  const email = useSelector(state => state.session.user?.email);
   

  const { user } = useSelector(state => state.session);

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

  const handleSignOut = async () => {
    await dispatch(logout());
    setProfileDropdownVisible(false);
    history.push("/login");
  };
  
  useEffect(() => {
    document.addEventListener('click', profileOutsideCLick);
    return () => {
      document.removeEventListener('click', profileOutsideCLick);
    };
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
                      <span className="material-symbols-outlined sidebarMenuIcon">history</span>
                      <button className="sidebarText">History</button>
                    </li>
                    <li className="sidebarMenuItem">
                      <span className="material-symbols-outlined sidebarMenuIcon">smart_display</span>
                      <button className="sidebarText">Your Videos</button>
                    </li>
                    <li className="sidebarMenuItem">
                      <span className="material-symbols-outlined sidebarMenuIcon">schedule</span>
                      <button className="sidebarText">Watch Later</button>
                    </li>
                    <li className="sidebarMenuItem">
                      <span className="material-symbols-outlined sidebarMenuIcon">thumb_up</span>
                      <button className="sidebarText">Like Videos</button>
                    </li>
                    <li className="sidebarLine"></li>
                    <li className="sidebarHeader sidebarMenuIcon">
                      <span className="sidebarText">Subscriptions</span>
                    </li>
                    <li className="sidebarMenuItem">
                      <span className="material-symbols-outlined sidebarMenuIcon">person</span>
                      <button className="sidebarText">Channel 1</button>
                    </li>
                    <li className="sidebarMenuItem">
                      <span className="material-symbols-outlined sidebarMenuIcon">person</span>
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
                      <span className="material-symbols-outlined sidebarMenuIcon">local_fire_department</span>
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

            {user ? (
                <div className="profile">
                <button className="profileContainer" onClick={toggleProfileDropdown}>
                  <img className="profileImage" src={profileDefault} alt="Profile" />
                </button>
                {profileDropdownVisible && (
                  <div className="profileDropdown">
                    <div className="profileHeader">
                      <img className="profileImage" src={profileDefault} alt="Profile" />
                      <div className="profileInfo">
                        <p className="profileName">{username}</p>
                        <p className="profileEmail">{email}</p>
                      </div>
                    </div>
                    <ul>
                      <li className="dropdownList">
                      <button className="dropdownButton">
                          <span className="material-symbols-outlined">account_box</span>
                          Your Channel
                        </button>
                      </li>
                      <li className="dropdownList">
                        <button className="dropdownButton" onClick={handleSignOut}>
                          <span class="material-symbols-outlined">logout</span>
                          Sign out
                        </button>
                      </li>

                      <hr className="dropdownDivider" />

                      <li className="dropdownList">
                        <button className="dropdownButton"><span class="material-symbols-outlined">mode_night</span>
                          Dark mode
                        </button>
                      </li>
                      <hr className="dropdownDivider" />
                      <li className="dropdownList">
                        <button className="dropdownButton"><span class="material-symbols-outlined">settings</span>
                          Settings
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
                </div>
                    ) : (
                      <Link to="/login" className="signInButton">
                        <span className="material-symbols-outlined">account_circle</span>
                        Sign In
                      </Link>
                    )}

          </div>
        </div>

        <div id="mainSectionContainer" className={navVisible ? "modalOpen" : ""}>
          Main Section
        </div>
      </div>
    </div>
  );

}

export default Navigation;
