import React from "react";
import { Link } from "react-router-dom";

import youtubeLogo from "../../assets/icons/TubeYou_2.png";
import "./Sidebar.css";

function Sidebar({ navVisible, setNavVisible }) {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modalContainer")) {
      setNavVisible(false);
    }
  };

  return (
    <>
      {navVisible && (
        <div className="modalContainer" onClick={handleOutsideClick}>
          <div className="modalContent">
            <div className="modalHeader">
              <button className="modalButton" onClick={() => setNavVisible(false)}>
                <i className="fa-sharp fa-solid fa-bars"></i>
              </button>
              <a className="modalLogoContainer" href="/">
                <img src={youtubeLogo} alt="youtube logo" style={{ width: '60px', height: '40px' }} />
              </a>
              <a className="logoTextSideBar" href="/">
                <p>TubeYou</p>
              </a>
           </div>
            <div className="modalBody">
              {/* Add YouTube-like sidebar menu items here */}
              <ul className="sidebarMenu">
                <li className="sidebarMenuItem">
                  <a href="/">
                    <span className="material-symbols-outlined sidebarMenuIcon">home</span>
                    <button className="sidebarText">Home</button>                      
                  </a>
                </li>
                {/* <li className="sidebarMenuItem">
                  <span className="material-symbols-outlined sidebarMenuIcon">subscriptions</span>
                  <button className="sidebarText">Subscriptions</button>
                </li> */}
                <li className="sidebarLine"></li>
                {/* <li className="sidebarMenuItem">
                  <span className="material-symbols-outlined sidebarMenuIcon">video_library</span>
                  <button className="sidebarText">Library</button>
                </li> */}
                {/* <li className="sidebarMenuItem">
                  <span className="material-symbols-outlined sidebarMenuIcon">history</span>
                  <button className="sidebarText">History</button>
                </li> */}
                {/* <li className="sidebarMenuItem">
                  <a href="/videos">
                    <span className="material-symbols-outlined sidebarMenuIcon">smart_display</span>
                    <button className="sidebarText">Your Videos</button>
                  </a>
                </li> */}
                {/* <li className="sidebarMenuItem">
                  <span className="material-symbols-outlined sidebarMenuIcon">schedule</span>
                  <button className="sidebarText">Watch Later</button>
                </li> */}
                {/* <li className="sidebarMenuItem">
                  <span className="material-symbols-outlined sidebarMenuIcon">thumb_up</span>
                  <button className="sidebarText">Like Videos</button>
                </li>
                <li className="sidebarLine"></li> */}
                {/* <li className="sidebarHeader sidebarMenuIcon">
                  <span className="sidebarText">Subscriptions</span>
                </li> */}
                {/* <li className="sidebarMenuItem">
                  <span className="material-symbols-outlined sidebarMenuIcon">person</span>
                  <button className="sidebarText">Channel 1</button>
                </li>
                <li className="sidebarMenuItem">
                  <span className="material-symbols-outlined sidebarMenuIcon">person</span>
                  <button className="sidebarText">Channel 2</button>
                </li>
                <li className="sidebarMenuItem">
                  <span className="material-symbols-outlined sidebarMenuIcon">add_circle</span>  
                  <button className="sidebarText">Browse Channels</button>
                </li> */}
                {/* <li className="sidebarLine"></li>
                <li className="sidebarHeader sidebarMenuIcon">
                  <span className="sidebarText">Explore</span>
                </li>
                <li className="sidebarMenuItem">
                  <span className="material-symbols-outlined sidebarMenuIcon">local_fire_department</span>
                  <button className="sidebarText">Trending</button>                 
                </li> */}
                {/* <li className="sidebarLine"></li>
                <li className="sidebarMenuItem">
                  <span className="material-symbols-outlined sidebarMenuIcon">settings</span>                    
                  <button className="sidebarText">Settings</button>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
