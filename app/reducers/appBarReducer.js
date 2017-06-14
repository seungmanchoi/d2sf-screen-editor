import { CHANGE_APP_BAR_TITLE } from '../actions/navAction';

const INITIAL_STATE = {
  title: 'Image',
  type: 'image' //image, imageSlide, video, settings
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_APP_BAR_TITLE:
      return {...state, title: action.payload.title, type: action.payload.type};
    default:
      return state;
  }
}
