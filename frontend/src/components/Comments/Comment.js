// frontend/src/components/Comment.js
import React from 'react';

const Comment = ({ comment }) => {
  const renderReplies = () => {
    return comment.replies.map((reply) => <Comment key={reply.id} comment={reply} />);
  };
  
  return (
    <div className="comment">
      <div className="comment-author">{comment.authorId}</div>
      <div className="comment-content">{comment.content}</div>
      {comment.replies && <div className="replies">{renderReplies()}</div>}
    </div>
  );
};

export default Comment;
