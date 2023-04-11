// videoPlayer.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteVideo, editVideo } from '../../actions/videoActions';

const VideoPlayer = ({ video, user }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);

  const handleDelete = async () => {
    if (user.id === video.userId) {
      await dispatch(deleteVideo(video.id));
      history.push('/');
    } else {
      alert('You are not authorized to delete this video.');
    }
  };

  const handleEdit = () => {
    if (user.id === video.userId) {
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
            </>
          )}
          <div className="video-edit-delete">
            <button onClick={handleEdit}>{editing ? 'Save' : 'Edit'}</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default VideoPlayer;
