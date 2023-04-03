import React from "react";
import {useState} from "react";

import "./reset.css";
import "./HomePage.css";

function HomePage() {
  const [navVisible, setNavVisible] = useState(true);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <div className="body">
      <div id="pageContainer">
        <div id="mastHeadContainer">
          <button className="navShowHide" onClick={toggleNav}>
            SideBar
          </button>
        </div>

        {navVisible && (
          <div id="sideNavContainer">
            Actual SideBar
          </div>
        )}

        <div id="mainSectionContainer" className={navVisible ? 'leftPadding' : ''}>
          Main Section
        </div>
      </div>
    </div>
  );
}

export default HomePage;