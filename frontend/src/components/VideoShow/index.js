import React from 'react';
import { useParams } from 'react-router-dom';
import VideoShow from './VideoShow';
import "./VideoShow.css";

function VideoShowPage() {
  const { videoId } = useParams();

  return (
    <>
      <div className="videoShow">
        <div className="videoShow-content">
        <VideoShow videoId={videoId} />
        </div>
      </div>
    </>
  );
}

export default VideoShowPage;
