// frontend/src/components/Comment.js
import React, { useState } from 'react';
import CommentForm from './CommentForm';
import './Comment.css';

const Comment = ({ comment, user, videoId, fetchComments, renderComment, onDelete, onUpdate, onReply, handleCommentSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    await onUpdate(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setShowReplyForm(false);
  };

  const renderCommentReplies = () => {
    return renderComment && comment.replies && comment.replies.map((reply, index) => (
        <Comment
          key={`${reply.id}_${index}`}
          comment={reply}
          user={user}
          videoId={videoId}
          renderComment={renderComment}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onReply={onReply}
        />
      ));
  };

  return (
    <div className="comment">
      <div className="comment-author">{comment.authorId}</div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div className="comment-content">{comment.content}</div>
      )}
      {user && user.id === comment.authorId && !isEditing && (
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => onDelete(comment)}>Delete</button>
          <button onClick={handleReply}>Reply</button>
        </div>
      )}
      {showReplyForm && (
        <CommentForm
          videoId={videoId}
          user={user}
          parentCommentId={comment.id}
          onCommentSubmitted={(content, parentCommentId) => handleCommentSubmit(content, parentCommentId, fetchComments)}
          onCancel={handleCancel}
        />
      )}
      {renderCommentReplies()}
    </div>
  );
};

export default Comment;
