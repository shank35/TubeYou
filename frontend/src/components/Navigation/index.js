import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import youtubeLogo from "../../assets/icons/TubeYou_2.png";
import "./Navigation.css";

import { DropdownProvider } from "./DropdownContext";


import ProfileButton from "./ProfileButton";
import VideoButton from "./VideoButton";
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
            <img src={youtubeLogo} alt="youtube_logo" style={{ width: '60px', height: '40px' }} />
          </a>
          <a className="logoText" href="/">
            <p>TubeYou</p>
          </a>
          <SearchBar />
          <DropdownProvider>
            <div className="rightIcons">
              {user ? (
                <>
                  <VideoButton />
                  <ProfileButton />
                </>
              ) : (
                <Link to="/login" className="signInButton">
                  <span className="material-symbols-outlined" >account_circle</span>
                  Sign In
                </Link>
              )}
            </div>
          </DropdownProvider>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
