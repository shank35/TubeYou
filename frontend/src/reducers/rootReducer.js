import { combineReducers } from 'redux';

import session from '../store/session'
import videoReducer from './videosReducer';
import commentReducer from './commentsReducer';
import likeReducer from './likesReducer';
import { searchReducer } from "./searchReducer";

const rootReducer = combineReducers({
  session,
  video: videoReducer,
  comment: commentReducer,
  likes: likeReducer,
  search: searchReducer
});

export default rootReducer;