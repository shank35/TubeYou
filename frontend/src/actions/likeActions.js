export const SET_LIKES = "likes/SET_LIKES";
export const SET_LIKE_STATUS = "likes/SET_LIKE_STATUS";

export const setLikes = (likeCount, dislikeCount) => ({
  type: SET_LIKES,
  likeCount,
  dislikeCount,
});

export const setLikeStatus = (likeStatus, dislikeStatus) => ({
  type: SET_LIKE_STATUS,
  likeStatus,
  dislikeStatus,
});


