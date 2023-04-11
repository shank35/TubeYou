// frontend/src/components/Comment.js
import React, { useState } from 'react';
import CommentForm from './CommentForm';
import './Comment.css';

const Comment = ({ comment, user, onDelete, onUpdate, videoId, fetchComments, renderComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleDelete = () => {
    onDelete(comment);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    await onUpdate({ ...comment, content: editedContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setShowReplyForm(false);
  };

  const renderCommentReplies = () => {
    console.log("Rendering replies for comment:", comment.id); // Add this line

    return comment.replies.map((reply, index) => (
      <Comment
        key={`${reply.id}_${index}`}
        comment={reply}
        user={user}
        onDelete={onDelete}
        onUpdate={onUpdate}
        videoId={videoId}
        fetchComments={fetchComments}
        renderComment={renderComment}
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
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleReply}>Reply</button>
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

      {comment.replies && <div className="replies">{renderCommentReplies()}</div>}
    </div>

  );
};

export default Comment;