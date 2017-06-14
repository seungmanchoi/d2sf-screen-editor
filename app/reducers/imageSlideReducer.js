import { ADD_IMAGE_SLIDE_BOX, UPDATE_IMAGE_SLIDE_BOX, DELETE_IMAGE_SLIDE_BOX } from '../actions/imageSlideAction';

const INITIAL_STATE = {
	imageSlideBoxes: []
  /**
   {
     ltitle: ''
     mtitle: '',
     stitle: '',
     images: [] path...
   }
   * */
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ADD_IMAGE_SLIDE_BOX:
		  var imageSlideBoxes = state.imageSlideBoxes;

      imageSlideBoxes.push(action.boxInfo);
			return {...state, imageSlideBoxes: imageSlideBoxes};

    case UPDATE_IMAGE_SLIDE_BOX:
      var imageSlideBoxes = state.imageSlideBoxes;

      for(let i = 0, max = imageSlideBoxes.length; i < max; i += 1) {
        if(i === action.boxInfo.boxKey) {
          imageSlideBoxes[i] = action.boxInfo;
          break;
        }
      }

      return {...state, imageSlideBoxes: imageSlideBoxes};

		case DELETE_IMAGE_SLIDE_BOX:
		  var imageSlideBoxes = state.imageSlideBoxes;

		  for(let i = 0, max = imageSlideBoxes.length; i < max; i += 1) {
		    if(i === action.boxKey) {
          imageSlideBoxes.splice(i, 1);
          break;
        }
      }

			return {...state, imageSlideBoxes: imageSlideBoxes};

		default:
			return state;
	}
}
