import React from 'react';
import VideoDetailsFormProvider from './VideoForm';
import "./Video.css";

function Video() {
  return (
    <>
      <div className="videoForm">
        <VideoDetailsFormProvider />
      </div>
    </>
  );
}

export default Video;
