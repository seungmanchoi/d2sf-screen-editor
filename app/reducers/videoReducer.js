import { SET_VIDEO } from '../actions/videoAction';

const INITIAL_STATE = {
	path: ''
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
    case SET_VIDEO:
      return {...state, path: action.path};
		default:
			return state;
	}
}
