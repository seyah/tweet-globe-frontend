import * as actions from '../actions/actionTypes';

export default function user(state = {
	firstName: '',
	lastName: '',
	username: '',
	isAuthenticated: false
}, action) {
	switch (action.type) {
		case actions.GET_SAMPLE_CONTENT:
			return Object.assign({}, state, {
				sampleContent1: action.payload.sampleContent1,
				sampleContent2: action.payload.sampleContent2,
				sampleContent3: action.payload.sampleContent3,
				sampleContent4: action.payload.sampleContent4
			});
		default:
			return state;
	}
}
