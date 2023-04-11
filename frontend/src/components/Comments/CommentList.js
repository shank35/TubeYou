// frontend/src/components/CommentList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setComment, editComment, deleteComment } from "../../actions/commentActions";
import { receiveComments } from '../../actions/commentActions';

import axios from 'axios';
import csrfFetch from '../../store/csrf'; 
import './CommentList.css';

import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentList = ({ videoId, user }) => {
  
  const comments = useSelector((state) => state.comment.comments);
  const dispatch = useDispatch();

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/videos/${videoId}/comments`);
      const commentsArray = Object.values(response.data);

      dispatch(receiveComments(commentsArray));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  

  useEffect(() => {
    fetchComments();
  }, [videoId, dispatch]);

  const handleCommentSubmit = (comment) => {
    dispatch(setComment(comment));
  };
  

  const handleCommentDelete = (comment) => {
    dispatch(deleteComment(comment.id));
  };

  const handleCommentUpdate = (comment) => {
    dispatch(editComment(comment));
  };

  const renderComment = (comment) => {
    return (
      <Comment
        key={comment.id}
        comment={comment}
        user={user}
        onDelete={handleCommentDelete}
        onUpdate={handleCommentUpdate}
        videoId={videoId}
        fetchComments={fetchComments}
        renderComment={renderComment}
      />
    );
  };
  
  

  return (
    <div>
      <CommentForm
        videoId={videoId}
        user={user}
        onCommentSubmitted={handleCommentSubmit}
      />
      {comments
        .filter((comment) => comment === null)
        .map((comment, index) => renderComment(comment))}
    </div>
  );
  
};


export default CommentList;
