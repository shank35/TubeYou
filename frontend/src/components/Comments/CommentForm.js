// frontend/src/components/CommentForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setComment } from "../../actions/commentActions";
import csrfFetch from "../../store/csrf";
import "./CommentForm.css";

function CommentForm({ videoId, parentCommentId, onCommentSubmitted, user }) {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    dispatch(setComment(data));

    setContent("");

    if (onCommentSubmitted) {
      onCommentSubmitted();
    }
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
          <button type="button" onClick={() => setContent("")}>
            CANCEL
          </button>
          <button type="submit">COMMENT</button>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
