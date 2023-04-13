const SET_LIKES = "likes/SET_LIKES";
const SET_LIKE_STATUS = "likes/SET_LIKE_STATUS";

const initialState = {
  likeStatus: null,
  likeCount: 0,
  dislikeCount: 0,
};

export default function likesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LIKES:
      return {
        ...state,
        likeCount: action.likeCount,
        dislikeCount: action.dislikeCount,
      };
    case SET_LIKE_STATUS:
      return {
        ...state,
        likeStatus: action.likeStatus,
        dislikeStatus: action.dislikeStatus,
      };
    default:
      return state;
  }
}
