import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import csrfFetch from "../../store/csrf";
import { setLikes, setLikeStatus } from "../../actions/likeActions";
import "./LikeShow.css";

const LikeButton = ({ videoId }) => {
  const { likeStatus, likeCount, dislikeCount, dislikeStatus } = useSelector(
    (state) => state.likes
  );
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [isDisliked, setIsDisliked] = useState(null);

  const fetchLikeStatus = async () => {
    if (!user) return;
    try {
      const response = await csrfFetch(`/api/videos/${videoId}/likes/${user.id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch like status: ${response.status}`);
      }
      const data = await response.json();
      if (data.like) {
        dispatch(setLikeStatus(data.like.liked, null));
      } else {
        dispatch(setLikeStatus(null, null));
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
      dispatch(setLikes(data.like_count, data.dislike_count));
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
      if (data.like) {
        // Update like status only if the 'like' field is present in the response
        dispatch(setLikeStatus(data.like.liked, null));
      }
    }
  };
  

  const handleLikes = async () => {
    if (likeStatus === null || likeStatus === false) {
      await handleLike(true);
      dispatch(setLikes(likeCount + 1, dislikeCount - (dislikeStatus === true ? 1 : 0)));
      dispatch(setLikeStatus(true, false));
    } else if (likeStatus === true) {
      await handleLike(null); // Change this line
      dispatch(setLikes(likeCount - 1, dislikeCount));
      dispatch(setLikeStatus(null, null)); // Change this line
    }
    try {
      const response = await csrfFetch(`/api/videos/${videoId}/likes/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch likes and dislikes: ${response.status}`);
      }
      const data = await response.json();
      dispatch(setLikes(data.like_count, data.dislike_count));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (dislikeStatus === null || dislikeStatus === false) {
      await handleLike(false);
      dispatch(
        setLikes(likeCount - (likeStatus === true ? 1 : 0), dislikeCount + 1)
      );
      dispatch(setLikeStatus(false, true));
      setIsDisliked(true);
    } else if (dislikeStatus === true) {
      await handleLike(null); // Change this line
      dispatch(setLikes(likeCount, dislikeCount - 1));
      dispatch(setLikeStatus(null, null)); // Change this line
      setIsDisliked(false);
    }
    try {
      const response = await csrfFetch(`/api/videos/${videoId}/likes/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch likes and dislikes: ${response.status}`);
      }
      const data = await response.json();
      dispatch(setLikes(data.like_count, data.dislike_count));
    } catch (err) {
      console.error(err);
    }
  };
  
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
