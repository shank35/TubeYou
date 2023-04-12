// frontend/src/actions/commentActions.js
export const SET_COMMENT = "SET_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    payload: comments,
  };
};

export const setComment = (comment) => ({
  type: SET_COMMENT,
  payload: comment,
});

export const editComment = (comment) => ({
  type: EDIT_COMMENT,
  payload: comment,
});

export const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});
