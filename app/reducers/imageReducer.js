import { SET_IMAGE } from '../actions/imageAction';

const INITIAL_STATE = {
	path: ''
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_IMAGE:
			return {...state, path: action.path};
		default:
			return state;
	}
}
