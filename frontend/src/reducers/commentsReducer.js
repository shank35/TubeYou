// commentReducer.js
import { SET_COMMENT, EDIT_COMMENT, DELETE_COMMENT, RECEIVE_COMMENTS } from "../actions/commentActions";

const initialState = {
  comments: []
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload.comment],
      };
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.comment.id ? action.payload.comment : comment
        ),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.payload.id),
      };
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments: action.payload.comments,
      };
    default:
      return state;
  }
};

export default commentReducer;
