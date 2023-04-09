import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
// import { useDropdown } from "./DropdownContext";
import "./VideoButton.css";

function VideoButton() {
  const [videoDropdownVisible, setVideoDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleVideoDropdown = () => {
    setVideoDropdownVisible(!videoDropdownVisible);
  };

  // const handleClickOutside = (event) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setVideoDropdownVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="videoButton">
      <button className="videoButtonContainer" onClick={toggleVideoDropdown}>
        <span className="material-symbols-outlined" style={{ fontSize: "35px" }}>
          video_call
        </span>
      </button>
      {videoDropdownVisible && (
        <div className="videoDropdown dropdown" ref={dropdownRef}>
          <ul>
            <li className="uploadVideoButton">
              <Link to="/videos/upload" className="uploadLink">
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