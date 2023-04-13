import { SEARCH_VIDEOS } from "../actions/searchActions";

const initialState = {
  videos: [],
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_VIDEOS:
      return { ...state, videos: action.payload };
    default:
      return state;
  }
};
