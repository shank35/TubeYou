import { UPLOAD_VIDEO, DELETE_VIDEO, EDIT_VIDEO, RECEIVE_VIDEO } from "../actions/videoActions";

const initialState = {
  videos: []
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_VIDEO: {
      const updatedVideos = state.videos.map(video => video.id === action.video.id ? action.video : video);
      return {
        ...state,
        videos: updatedVideos,
      };
    }
    case UPLOAD_VIDEO:
      return {
        ...state,
        uploadSuccess: action.payload?.success,
        uploadErrors: action.payload?.errors || [],
      };
    case DELETE_VIDEO:
      return {
        ...state,
        videos: state.videos.filter((video) => video._id !== action.payload),
      };
    case EDIT_VIDEO:
      return {
        ...state,
        videos: state.videos.map((video) =>
          video._id === action.payload._id ? action.payload : video
        ),
      };
    default:
      return state;
  }
};

export default videoReducer;
