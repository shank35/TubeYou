// frontend/src/components/CommentList.js
import React, { useEffect, useState } from 'react';


import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentList = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/videos/${videoId}/comments`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        try {
          const data = await response.json();
          if (Array.isArray(data)) {
            setComments(data);
          } else {
            setComments(Object.entries(data).map(([key, value]) => value));
          }
        } catch (error) {
          throw new Error('Response was not JSON: ' + error.message);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        // Handle the error, e.g. display an error message to the user
      }
    };
    fetchComments();
  }, [videoId]);
  
  const handleCommentSubmit = (comment) => {
    fetch(`/api/videos/${videoId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
      })
      .catch((error) => {
        console.error('Error submitting comment:', error);
      });
  };
  

  return (
    <div>
      <CommentForm videoId={videoId} onSubmit={handleCommentSubmit} />
      {comments.map((comment, index) => (
        <Comment key={`${comment.id}_${index}`} comment={comment} />
      ))}


    </div>
  );
};

export default CommentList;
