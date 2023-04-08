import { UPLOAD_VIDEO } from "../actions/videoActions";

const initialState = {
  uploadSuccess: false,
  uploadErrors: []
}

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_VIDEO:
      return {
        ...state,
        uploadSuccess: action.payload.success,
        uploadErrors: action.payload.errors || [],
      };
      default:
        return state;
  }
};

export default videoReducer;