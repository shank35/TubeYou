// videoPlayer.js
import React, { useState } from 'react';

const VideoPlayer = ({ video }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!video) {
    return <div>Loading...</div>;
  }

  const { title, description, videoFileUrl } = video;

  const handleDescriptionClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div>
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
          <h1 className="video-title">{title}</h1>
          <div className="video-info">
            <div className="views-and-likes">
              <p>1000 views</p>
            </div>
            <div className="video-actions">
              <p>
                50 <span className="material-symbols-outlined">thumb_up</span>
              </p>
              <p>
                5 <span className="material-symbols-outlined">thumb_down</span>
              </p>
            </div>
          </div>
          <div className="channel-info">
            <div className="channel-avatar">
              <span className="material-symbols-outlined" style={{ fontSize: "50px" }}>face</span>
            </div>
            <div className="channel-name">
              <p>Channel Name</p>
              <button className="subscribe-button">Subscribe</button>
            </div>
          </div>
          <div className={`description ${showFullDescription ? 'expanded' : 'collapsed'}`}>
            <p>{description}</p>
            <button onClick={handleDescriptionClick} className="description-toggle">
              {showFullDescription ? 'Show less' : 'Show more'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
