import { combineReducers } from 'redux';

import session from '../store/session'
import videoReducer from './videosReducer';
import commentReducer from './commentsReducer';
import likeReducer from './likesReducer';


const rootReducer = combineReducers({
  session,
  video: videoReducer,
  comment: commentReducer,
  likes: likeReducer
});

export default rootReducer;