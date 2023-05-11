
import React from 'react';

function UserAvatar({username}) {
  const letter = username.substr(0, 1).toUpperCase();
  const backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16); // generate a random color for each user
  return (
    <div className="user-avatar" style={{backgroundColor}}>
      {letter}
    </div>
  );
}

function UserProfile({user}) {
  return (
    <div className="user-profile">
      <UserAvatar username={user.username} />
      <h2>{user.username}</h2>
      <p>{user.email}</p>
    </div>
  );
}

export default UserProfile;