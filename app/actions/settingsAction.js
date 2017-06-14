export const SET_XML_IMAGE_PATH = 'SET_XML_IMAGE_PATH';
export const SET_XML_IMAGE_SLIDE_PATH = 'SET_XML_IMAGE_SLIDE_PATH';
export const SET_XML_VIDEO_PATH = 'SET_XML_VIDEO_PATH';
export const SET_SAVED_SETTINGS = 'SET_SAVED_SETTINGS';
export const SET_INIT_SETTINGS = 'SET_INIT_SETTINGS';

export const setDirectory = ({type, path}) => ({
  type, path
});
