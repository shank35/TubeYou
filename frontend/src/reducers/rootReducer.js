import { combineReducers } from 'redux';

import session from '../store/session'
import videoReducer from './videosReducer';
import commentReducer from './commentsReducer';

const rootReducer = combineReducers({
  session,
  video: videoReducer,
  comment: commentReducer
});

export default rootReducer;