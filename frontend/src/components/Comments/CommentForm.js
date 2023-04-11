// frontend/src/components/CommentForm.js
import React, { useState } from 'react';
import csrfFetch from '../../store/csrf';

function CommentForm({ videoId }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await csrfFetch(`/api/videos/${videoId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: { content } }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Comment:
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;
