// videoPlayer.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LikeButton from '../LikeShow/index';

import { deleteVideo, editVideo } from '../../actions/videoActions';

const VideoPlayer = ({ video, user }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const descriptionThreshold = 150;
  const userId = user ? user.id : null;

  const handleDelete = async () => {
    if (userId === video?.userId) {
      await dispatch(deleteVideo(video.id));
      history.push('/');
    } else {
      alert('You are not authorized to delete this video.');
    }
  };

  const handleEdit = () => {
    if (userId === video.userId) {
      if (editing) {
        dispatch(editVideo(video.id, title, description));
      }
      setEditing(!editing);
    } else {
      alert('You are not authorized to edit this video.');
    }
  };
  

  if (!video) {
    return <div>Loading...</div>;
  }

  const { videoFileUrl } = video;
  const handleDescriptionClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div>
      <div className="video-player">
        <div className="video-container">
          <video width="100%" controls src={videoFileUrl} type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-edit-delete">
        {userId === video.userId && (
          <>
            <button onClick={handleEdit}>{editing ? 'Save' : 'Edit Video'}</button>
            <button onClick={handleDelete}>Delete Video</button>
          </>
        )}
        </div>
        <div className="video-details">
          {editing ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
              <div className="video-info">
                <div className="views-and-likes">
                  <p>{video.views}</p>
                </div>
                <div className="video-actions">
                  <LikeButton videoId={video.id} />
                </div>
              </div>
              <div className="channel-info">
                <div className="channel-avatar">
                  <span className="material-symbols-outlined" style={{ fontSize: "50px" }}>face</span>
                </div>
                <div className="channel-name">
                  <p>Channel Name</p>
                  {/* <button className="subscribe-button">Subscribe</button> */}
                </div>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              ></textarea>
            </>
          ) : (
            <>
              <h1 className="video-title">{title}</h1>
              <div className="video-info">
                <div className="views-and-likes">
                  <p>{video.views}</p>
                </div>
                <div className="video-actions">
                  <LikeButton videoId={video.id} />
                </div>
              </div>
              <div className="channel-info">
                <div className="channel-avatar">
                  <span className="material-symbols-outlined" style={{ fontSize: "50px" }}>face</span>
                </div>
                <div className="channel-name">
                  <p>{video.authorUsername}</p>
                  {/* <button className="subscribe-button">Subscribe</button> */}
                </div>
              </div>
              <div className={`description ${showFullDescription ? 'expanded' : description.length > descriptionThreshold ? 'show-toggle' : 'collapsed'}`}>
                <p>{description}</p>
                {description.length > descriptionThreshold && (
                  <button onClick={handleDescriptionClick} className="description-toggle">
                    {showFullDescription ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default VideoPlayer;
