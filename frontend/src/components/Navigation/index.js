import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import youtubeLogo from "../../assets/icons/youtube_logo.png";
import upload from "../../assets/icons/upload.png";
import "./Navigation.css";

import ProfileButton from "./ProfileButton";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";

function Navigation() {
  const [navVisible, setNavVisible] = useState(false);
  const { user } = useSelector(state => state.session);

  const handleMenuClick = () => {
    setNavVisible(true);
  };

  return (
    <div className="body">
      <div id="pageContainer">
        <div id="mastHeadContainer">
          <button className="navButton" onClick={handleMenuClick}>
            <i className="fa-sharp fa-solid fa-bars"></i>
          </button>
          <Sidebar navVisible={navVisible} setNavVisible={setNavVisible} />
          <a className="logoContainer" href="/">
            <img src={youtubeLogo} alt="youtube logo" />
          </a>
          <SearchBar />
          <div className="rightIcons">
            <a href="/">
              <img className="upload" src={upload} alt="Upload" />
            </a>
            {user ? (
              <ProfileButton />
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
