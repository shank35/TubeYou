import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import profileDefault from "../../assets/profile/default.png";
import "./ProfileButton.css";

function ProfileButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const username = useSelector(state => state.session.user?.username);
  const email = useSelector(state => state.session.user?.email);

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const handleSignOut = async () => {
    await dispatch(logout());
    setProfileDropdownVisible(false);
    history.push("/login");
  };

  return (
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
  );
}

export default ProfileButton;
