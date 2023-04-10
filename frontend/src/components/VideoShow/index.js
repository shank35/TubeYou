import React from 'react';
import { useParams } from 'react-router-dom';
import VideoShow from './VideoShow';
import CommentList from '../Comments/CommentList';
import "./VideoShow.css";

function VideoShowPage() {
  const { videoId } = useParams();

  return (
    <>
      <div className="videoShow">
        <div className="videoShow-content">
        <VideoShow videoId={videoId} />
        <CommentList videoId={videoId} />
        </div>
      </div>
    </>
  );
}

export default VideoShowPage;
