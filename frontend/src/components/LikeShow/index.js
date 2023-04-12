// frontend/src/components/LikeButton.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import csrfFetch from '../../store/csrf';

import './LikeShow.css'

const LikeButton = ({ videoId }) => {
  const [likeStatus, setLikeStatus] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [dislikeStatus, setDislikeStatus] = useState(null);
  const user = useSelector((state) => state.session.user);

  const fetchLikeStatus = async () => {
    if (!user) return;
    
    try {
      const response = await csrfFetch(`/api/videos/${videoId}/likes/${user.id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch like status: ${response.status}`);
      }
      const data = await response.json();
      if (data.like) {
        setLikeStatus(data.like.liked);
      } else {
        setLikeStatus(null);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const fetchLikesAndDislikes = async () => {
    try {
      const response = await csrfFetch(`/api/videos/${videoId}/likes/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch likes and dislikes: ${response.status}`);
      }
      const data = await response.json();
      setLikeCount(data.like_count);
      setDislikeCount(data.dislike_count);
    } catch (err) {
      console.error(err);
    }
  };
  
  
  const handleLike = async (newLikeStatus) => {
    if (!user) {
      return;
    }
  
    const response = await csrfFetch(`/api/videos/${videoId}/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ liked: newLikeStatus }),
    });
  
    const data = await response.json();
    if (data.success) {
      setLikeStatus(data.like.liked);
    }
  };
  
  const handleLikes = async () => {
    if (likeStatus === null || likeStatus === false) {
      setLikeCount((prevCount) => prevCount + 1);
      setLikeStatus(true);
  
      if (dislikeStatus === true) {
        setDislikeCount((prevCount) => prevCount - 1);
        setDislikeStatus(false);
      }
      await handleLike(true);
    } else if (likeStatus === true) {
      setLikeCount((prevCount) => prevCount - 1);
      setLikeStatus(false);
      setDislikeStatus(false);
      await handleLike(false);
    }
  };
  
  const handleDislike = async () => {
    if (dislikeStatus === null || dislikeStatus === false) {
      setDislikeCount((prevCount) => prevCount + 1);
      setDislikeStatus(true);
  
      if (likeStatus === true) {
        setLikeCount((prevCount) => prevCount - 1);
        setLikeStatus(false);
      }
      await handleLike(false);
    } else {
      setDislikeCount((prevCount) => prevCount - 1);
      setDislikeStatus(null);
      setLikeStatus(null);
      if (likeStatus === true) {
        await handleLike(true);
      }
    }
  };
  
// eslint-disable-next-line
  useEffect(() => {
    fetchLikeStatus();
    fetchLikesAndDislikes();
  }, [videoId, user]);


  return (
    <div className="like-buttons">
      <span className="like-count">{likeCount}</span>
      <button
        className={`like-button ${likeStatus === true ? 'active' : ''}`}
        onClick={handleLikes}
      >
        <i className="fas fa-thumbs-up fa-2x"></i>
        Like
      </button>
      <span className="dislike-count">{dislikeCount}</span>

      <button
        className={`dislike-button ${dislikeStatus === true ? 'active' : ''}`}
        onClick={handleDislike}
      >
        <i className="fas fa-thumbs-down fa-2x"></i>
        Dislike
      </button>
    </div>

  );
};

export default LikeButton;
