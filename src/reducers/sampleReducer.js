import * as actions from '../actions/actionTypes';

export default function selectedCase(state = {
	sampleContent1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	sampleContent2: 'Mauris at quam ipsum. Aliquam sit amet varius eros. Morbi at quam scelerisque, varius nibh id, pharetra ipsum. Morbi vulputate libero id dui sagittis, in eleifend est mollis. Integer id nunc venenatis, laoreet dolor vitae, auctor sem. Vivamus elementum molestie turpis, sit amet ultricies arcu. Ut justo nibh, tempor nec volutpat ac, tristique eget dui. Nulla eu libero ante. Quisque ac finibus justo, at tempus nisl. Duis finibus rutrum nulla quis dapibus. Duis lorem purus, cursus a hendrerit sed, maximus vel odio. Duis tincidunt, mi non congue accumsan, erat ipsum tincidunt dui, et maximus risus orci eget lorem. Maecenas sit amet nulla leo. Maecenas venenatis neque sit amet lorem blandit, in tristique ipsum vestibulum. Pellentesque nec massa ut quam tempor rhoncus vitae nec odio.',
	sampleContent3: 'Quisque sed sem leo. Suspendisse ante massa, volutpat et elementum vel, gravida eu urna. Sed ut turpis nibh. Quisque ullamcorper, nisl sit amet condimentum sodales, erat metus mattis ipsum, eget malesuada arcu nisl ac ex. Vivamus accumsan tincidunt neque nec imperdiet. Vivamus a scelerisque nisl. Donec egestas gravida eleifend. Mauris vitae pretium nulla, nec vehicula lorem. Etiam bibendum faucibus diam, vel cursus justo.',
	sampleContent4: 'Suspendisse ultrices massa in metus congue auctor. Aenean facilisis odio sapien, ut dapibus magna lobortis eget. Nunc euismod blandit iaculis. Aliquam pulvinar, justo vel commodo laoreet, sapien elit tempus neque, vitae eleifend eros risus vitae ex. Duis libero justo, tempus sit amet est auctor, fringilla gravida arcu. Nunc quis varius turpis, et aliquet lorem. Etiam placerat maximus sollicitudin. Nunc rhoncus nisl neque.'
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
