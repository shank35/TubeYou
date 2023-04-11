// frontend/src/components/CommentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import csrfFetch from '../../store/csrf'; 
import './CommentList.css';

import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentList = ({ videoId, user }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/videos/${videoId}/comments`);
      setComments(Object.values(response.data).reverse());
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const handleCommentSubmit = (comment) => {
    csrfFetch(`/api/videos/${videoId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchComments();
      })
      .catch((error) => {
        console.error('Error submitting comment:', error);
      });
  };
  
  const handleCommentDelete = (comment) => {
    csrfFetch(`/api/videos/${videoId}/comments/${comment.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((c) => c.id !== comment.id)
        );
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };
  
  
  const handleCommentUpdate = (comment) => {
    csrfFetch(`/api/videos/${videoId}/comments/${comment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    })
      .then(() => {
        setComments((prevComments) => {
          return prevComments.map((c) => {
            if (c.id === comment.id) {
              return { ...c, ...comment };
            } else {
              return c;
            }
          });
        });
      })
      .catch((error) => {
        console.error('Error updating comment:', error);
      });
  };

  const renderComment = (comment) => (
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

  
  return (
    <div>
      <CommentForm
        videoId={videoId}
        user={user} // Add this prop
        onCommentSubmitted={fetchComments}
      />
      {comments
        .filter((comment) => !comment.parent_comment_id)
        .map((comment, index) => renderComment(comment))}

    </div>
  );


  
};

export default CommentList;
