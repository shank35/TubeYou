// frontend/src/components/CommentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentList = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/videos/${videoId}/comments`);
        setComments(Object.values(response.data));
      } catch (error) {
        console.error('Error fetching comments:', error);
        // Handle the error, e.g. display an error message to the user
      }
    };
    fetchComments();
  }, [videoId]);
  
  const handleCommentSubmit = (comment) => {
    axios.post(`/api/videos/${videoId}/comments`, comment)
      .then((response) => {
        setComments((prevComments) => [...prevComments, response.data]);
      })
      .catch((error) => {
        console.error('Error submitting comment:', error);
      });
  };
  
  const handleCommentDelete = (comment) => {
    axios.delete(`/api/comments/${comment.id}`)
      .then(() => {
        setComments((prevComments) => prevComments.filter((c) => c.id !== comment.id));
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };
  
  const handleCommentUpdate = (comment) => {
    axios.put(`/api/comments/${comment.id}`, comment)
      .then(() => {
        setComments((prevComments) => {
          return prevComments.map((c) => {
            if (c.id === comment.id) {
              return comment;
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
  console.log(comments)

  return (
    <div>
      <CommentForm videoId={videoId} onSubmit={handleCommentSubmit} />
      {comments.map((comment, index) => (
        <Comment
          key={`${comment.id}_${index}`}
          comment={comment}
          onDelete={handleCommentDelete}
          onUpdate={handleCommentUpdate}
        />
      ))}
    </div>
  );
};

export default CommentList;
