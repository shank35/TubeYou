import React from 'react';

const VideoPlayer = ({ video }) => {
  if (!video) {
    return <div>Loading...</div>;
  }

  const { title, description, video_file_url } = video;

  return (
    <div className="video-player">
      <div className="video-player-info">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <video
        width="100%"
        controls
        src={video_file_url}
        type="video/mp4"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
