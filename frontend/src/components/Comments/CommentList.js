// frontend/src/components/CommentList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setComment, editComment, deleteComment } from "../../actions/commentActions";
import { receiveComments } from '../../actions/commentActions';

import csrfFetch from '../../store/csrf'; 
import './CommentList.css';

import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentList = ({ videoId, user }) => {
  
  const comments = useSelector((state) => Object.values(state.comment));
  const dispatch = useDispatch();

  const fetchComments = async () => {
    try {
      const response = await csrfFetch(`/api/videos/${videoId}/comments`);
      const commentsArray = Object.values(await response.json());
  
      dispatch(receiveComments(commentsArray));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
  useEffect(() => {
    fetchComments();
  }, [videoId, dispatch]);

  const handleCommentSubmit = (comment) => {
    fetchComments();
  };
  
  const handleCommentDelete = async (comment) => {
    await dispatch(deleteComment(comment.id));
  };
  
  const handleCommentUpdate = (comment) => {
    dispatch(editComment(comment));
    fetchComments();
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
        .filter((comment) => !comment.parent_comment_id).reverse()
        .map((comment, index) => renderComment(comment, index))}
    </div>
  );
  
};

export default CommentList;
