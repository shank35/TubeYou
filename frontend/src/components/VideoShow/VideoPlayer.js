// videoPlayer.js
import React from 'react';

const VideoPlayer = ({ video }) => {
  if (!video) {
    return <div>Loading...</div>;
  }

  const { title, description, videoFileUrl } = video;

  return (
    <div className="video-player">
      <div className="video-container">
        <video
          width="100%"
          controls
          src={videoFileUrl}
          type="video/mp4"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="video-details">
        <h1>{title}</h1>
        <div className="views-and-likes">
          <p>1000 views • 50 likes • 5 dislikes</p>
        </div>
        <div className="channel-info">
          <div className="channel-avatar">
            <span class="material-symbols-outlined" style={{ fontSize: "50px" }}>face</span>
          </div>
          <div className="channel-name">
            <p>Channel Name</p>
            <button>Subscribe</button>
          </div>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
