// commentReducer.js
import { SET_COMMENT, EDIT_COMMENT, DELETE_COMMENT, RECEIVE_COMMENTS } from "../actions/commentActions";

const initialState = {};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENT:
      return {
        ...state,
        [action.payload.comment.id]: action.payload.comment,
      };
    case EDIT_COMMENT:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case DELETE_COMMENT:
      const comment = action.payload;
      const { [comment]: _remove, ...newState } = state;
      return newState;
    case RECEIVE_COMMENTS:
      const commentsObj = action.payload.reduce((acc, comment) => {
        acc[comment.id] = comment;
        return acc;
      }, {});
      return {
        ...state,
        ...commentsObj,
      };
    default:
      return state;
  }
};


export default commentReducer;
