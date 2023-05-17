//frontend/src/UserProfile/index.js
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import "./UserProfile.css"


function UserAvatar({ className = "" }) {
  const user = useSelector(state => state?.session.user);

  const letter = user.username.substr(0, 1).toUpperCase();

  const [backgroundColor, setBackgroundColor] = useState('');
  
  // only generate a new color when the component is first mounted (or when the user changes)
  useEffect(() => {
    // try to load the color from local storage
    const savedColor = localStorage.getItem(`user-color-${user.id}`);
    if (savedColor) {
      setBackgroundColor(savedColor);
    } else {
      const newColor = '#' + Math.floor(Math.random()*16777215).toString(16); // generate a random color for each user
      setBackgroundColor(newColor);
      localStorage.setItem(`user-color-${user.id}`, newColor); // save the color in local storage
    }
  }, [user]);

  return (
    <div className={`user-avatar ${className}`} style={{backgroundColor}}>
      {letter}
    </div>
  );
}

function UserProfile() {
  const user = useSelector(state => state?.session.user);

  return (
    <div className="user-profile">
      <UserAvatar username={user.username} />
      <div className="user-info">
        <h1>Your Channel</h1>
        <h2>{user.username}</h2>
      </div>
    </div>
  );
}

export default UserProfile;