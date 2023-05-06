// frontend/src/components/CommentForm.js
import React, { useState } from "react";

import "./CommentForm.css";

function CommentForm({ videoId, parentCommentId, onCommentSubmitted, user }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === "") {
      return;
    }
    if (onCommentSubmitted) {
      onCommentSubmitted(content, parentCommentId);
    }
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="avatar">
        <img src="https://via.placeholder.com/36" alt="Avatar" />
      </div>
      <div className="comment-content">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
        />
        <div className="comment-buttons">
          <button className="comment-cancel" type="button" onClick={() => setContent("")}>
            CANCEL
          </button>
          <button className="comment-comment" type="submit">COMMENT</button>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
