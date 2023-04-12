// frontend/src/components/CommentList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setComment, deleteComment } from "../../actions/commentActions";
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

  const handleCommentSubmit = async (content, parentCommentId) => {
    const response = await csrfFetch(`/api/videos/${videoId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: {
          content,
          parent_comment_id: parentCommentId,
          author_id: user.id,
        },
      }),
    });
    const data = await response.json();
    dispatch(setComment({ comment: data }));
    fetchComments();
  };
  
  
  const handleCommentDelete = async (comment) => {
    const response = await csrfFetch(`/api/videos/${videoId}/comments/${comment.id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    dispatch(deleteComment(data.id));
    return response;
  };
  
  const handleCommentUpdate = async (commentId, updatedContent) => {
    const response = await csrfFetch(`/api/videos/${videoId}/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: updatedContent }),
    });
    const data = await response.json();
    fetchComments();
  };
  
  const renderComment = (comment, index) => {
    return (
      <div key={comment.id || index}>
<Comment
  key={comment.id || index}
  comment={comment}
  user={user}
  onDelete={handleCommentDelete}
  onUpdate={handleCommentUpdate}
  videoId={videoId}
  fetchComments={fetchComments}
  handleCommentSubmit={handleCommentSubmit}
  renderComment={renderComment}
/>

        {comment.replies && (
          <div className="nested-replies">
            {comment.replies.map((reply, index) => renderComment(reply, index))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div>
      <CommentForm
        videoId={videoId}
        user={user}
        onCommentSubmitted={(content, parentCommentId) => handleCommentSubmit(content, parentCommentId, fetchComments)}
      />  
      {comments
        .filter((comment) => !comment.parent_comment_id).reverse()
        .map((comment, index) => renderComment(comment, index))}
    </div>
  );
};

export default CommentList;
