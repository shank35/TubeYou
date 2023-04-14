import React from 'react';
import { useParams } from 'react-router-dom';
import VideoShow from './VideoShow';
import CommentList from '../Comments/CommentList';

import "./VideoShow.css";

function VideoShowPage(props) {
  const { videoId } = useParams();
  const { user } = props;

  return (
    <>
      <div className="videoShow">
        <div className="videoShow-content">
        <VideoShow videoId={videoId} user={user} />
        <CommentList videoId={videoId} user={user} />
        </div>
      </div>
    </>
  );
}

export default VideoShowPage;
