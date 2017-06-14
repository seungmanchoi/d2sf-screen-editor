import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import imageReducer from './imageReducer';
import imageSlideReducer from './imageSlideReducer';
import videoReducer from './videoReducer';
import appBarReducer from './appBarReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
  router,
  image: imageReducer,
  imageSlide: imageSlideReducer,
  video: videoReducer,
  settings: settingsReducer,
  appBar: appBarReducer,
});

export default rootReducer;
