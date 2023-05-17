// ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTheme } from "./ThemeContext";

import { logout } from "../../store/session";
import { useDropdown } from "./DropdownContext";
import "./ProfileButton.css";
import "./themes.css";

function ProfileButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const { activeDropdown, setActiveDropdown } = useDropdown();
  const username = useSelector((state) => state.session.user?.username);
  const email = useSelector((state) => state.session.user?.email);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);


  const toggleProfileDropdown = () => {
    if (activeDropdown === "profile") {
      setActiveDropdown(null);
    } else {
      setActiveDropdown("profile");
    }
  };

  useEffect(() => {
    if (activeDropdown === "profile") {
      setProfileDropdownVisible(true);
    } else {
      setProfileDropdownVisible(false);
    }
  }, [activeDropdown, setActiveDropdown]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".profile")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeDropdown, setActiveDropdown]);

  const handleSignOut = async () => {
    await dispatch(logout());
    setProfileDropdownVisible(false);
    history.push("/login");
  };

  return (
    <div className={`profile ${theme}-theme`}>
      <button className="profileContainer" onClick={toggleProfileDropdown}>
        <span className="material-symbols-outlined" style={{ fontSize: "35px" }}>
          account_circle
        </span>
      </button>
      {profileDropdownVisible && (
        <div className="profileDropdown dropdown">
          <div className="profileHeader">
            <span className="material-symbols-outlined" style={{ fontSize: "35px" }}>
              account_circle
            </span>
            <div className="profileInfo">
              <p className="profileName">{username}</p>
              <p className="profileEmail">{email}</p>
            </div>
          </div>
          <ul>
            {/* <li className="dropdownList">
              <button className="dropdownButton">
                <span className="material-symbols-outlined">account_box</span>
                Your Channel
              </button>
            </li> */}
            <li className="dropdownList">
              <button className="dropdownButton" onClick={handleSignOut}>
                <span className="material-symbols-outlined">logout</span>
                Sign out
              </button>
            </li>

            <hr className="dropdownDivider" />

            {/* <li className="dropdownList">
              <button className="dropdownButton" onClick={toggleTheme}>
                <span className="material-symbols-outlined">
                  {theme === "light" ? 
                  <span className="material-symbols-outlined">mode_night</span>
                   : 
                   <span className="material-symbols-outlined">
                  light_mode
                  </span>
                  }
                </span>
                {theme === "light" ? "Dark mode" : "Light mode"}
              </button>
            </li>
            <hr className="dropdownDivider" /> */}
            {/* <li className="dropdownList">
              <button className="dropdownButton">
                <span className="material-symbols-outlined">settings</span>
                Settings
              </button>
            </li> */}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
