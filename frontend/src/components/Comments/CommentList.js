// frontend/src/components/CommentList.js
import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentList = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/videos/${videoId}/comments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          throw new Error('Response was not JSON');
        }
      })
      .then((data) => setComments(data))
      .catch((error) => {
        console.error('Error fetching comments:', error);
        // Handle the error, e.g. display an error message to the user
      });
  }, [videoId]);
  
  

  const handleCommentSubmit = (comment) => {
    fetch(`/videos/${videoId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add your authentication headers if necessary
      },
      body: JSON.stringify(comment),
    })
      .then((response) => response.json())
      .then((newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
      });
  };

  return (
    <div>
      <CommentForm videoId={videoId} onSubmit={handleCommentSubmit} />
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
