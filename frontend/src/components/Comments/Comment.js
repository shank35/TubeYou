// frontend/src/components/Comment.js
import React, { useState, useEffect } from 'react';
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

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };  

  const handleUpdate = async () => {
    await onUpdate(comment.id, editedContent);
    setIsEditing(false);
    fetchComments();
  };

  const handleCancel = () => {
    setShowReplyForm(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownVisible && !event.target.closest('.dropdown-container')) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownVisible]);


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
          <div className="button-container">
            <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
            <button className="save-button" onClick={handleUpdate}>Save</button>
          </div>
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
            <div className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
              <button className="dropdown-item" onClick={handleEdit}>
                <span className="material-symbols-outlined">edit</span>
                Edit
              </button>
              <button className="dropdown-item" onClick={() => onDelete(comment)}>
                <span className="material-symbols-outlined">delete</span>
                Delete
              </button>
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
