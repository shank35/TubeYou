import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./VideoButton.css";

function VideoButton() {
  const [videoDropdownVisible, setVideoDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleVideoDropdown = () => {
    setVideoDropdownVisible(!videoDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setVideoDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="videoButton">
      <button
        ref={buttonRef}
        className="videoButtonContainer"
        onClick={toggleVideoDropdown}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "35px" }}>
          video_call
        </span>
      </button>
      {videoDropdownVisible && (
        <div className="videoDropdown dropdown" ref={dropdownRef}>
          <ul>
          <li className="uploadVideoButton">
  <Link
    to="/videos/upload"
    className="uploadLink"
    onClick={() => setVideoDropdownVisible(false)} // close dropdown on click
  >
    <span className="material-symbols-outlined">slideshow</span>
    Upload Video
  </Link>
</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default VideoButton;
