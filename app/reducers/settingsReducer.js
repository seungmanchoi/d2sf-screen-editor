import { SET_XML_IMAGE_PATH, SET_XML_IMAGE_SLIDE_PATH, SET_XML_VIDEO_PATH, SET_SAVED_SETTINGS, SET_INIT_SETTINGS } from '../actions/settingsAction';

const INITIAL_STATE = {
  imagePath: '',
  savedImagePath: '',
  imageSlidePath: '',
  savedImageSlidePath: '',
  videoPath: '',
  savedVideoPath: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_XML_IMAGE_PATH:
      return {...state, imagePath: action.path};
    case SET_XML_IMAGE_SLIDE_PATH:
      return {...state, imageSlidePath: action.path};
    case SET_XML_VIDEO_PATH:
      return {...state, videoPath: action.path};
    case SET_SAVED_SETTINGS:
      return {...state, savedImagePath: action.pathData.imagePath, savedImageSlidePath: action.pathData.imageSlidePath, savedVideoPath: action.pathData.videoPath};
    case SET_INIT_SETTINGS:
      return {...state, ...action.pathData, savedImagePath: action.pathData.imagePath, savedImageSlidePath: action.pathData.imageSlidePath, savedVideoPath: action.pathData.videoPath}
    default:
      return state;
  }
}
