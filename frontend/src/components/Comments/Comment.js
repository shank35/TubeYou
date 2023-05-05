// frontend/src/components/Comment.js
import React, { useState } from 'react';
import CommentForm from './CommentForm';
import './Comment.css';

const Comment = ({ comment, user, videoId, fetchComments, renderComment, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    await onUpdate(comment.id, editedContent);
    setIsEditing(false);
    fetchComments();
  };

  const handleCancel = () => {
    setShowReplyForm(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const renderCommentReplies = () => {
    return renderComment && comment.replies && comment.replies.map((reply, index) => (
      <Comment
        key={`${reply.id}_${index}`}
        comment={reply}
        user={user}
        videoId={videoId}
        fetchComments={fetchComments}
        renderComment={renderComment}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    ));
  };

  return (
    <div className="comment">
      <div className="comment-author">{comment.authorUsername}</div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button className="save-button" onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div className="comment-content">{comment.content}</div>
      )}
      {user && user.id === comment.authorId && !isEditing && (
        <div className="dropdown-container">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
          <span className="material-symbols-outlined">more_vert</span>
          </button>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleEdit}>Edit</button>
              <button className="dropdown-item" onClick={() => onDelete(comment)}>Delete</button>
            </div>
          )}
        </div>
      )}
      {showReplyForm && (
        <CommentForm
          videoId={videoId}
          user={user}
          parentCommentId={comment.id}
          onCommentSubmitted={fetchComments}
          onCancel={handleCancel}
        />
      )}
      {renderCommentReplies()}
    </div>
  );
};

export default Comment;
