// frontend/src/components/CommentForm.js
import React, { useState } from 'react';

const CommentForm = ({ videoId, parentCommentId, onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ content, videoId, parentCommentId });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
