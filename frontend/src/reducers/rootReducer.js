import { combineReducers } from 'redux';

import session from '../store/session'
import videoReducer from './videosReducer';

const rootReducer = combineReducers({
  session,
  video: videoReducer
});

export default rootReducer;