import axios from 'axios';
import * as instr from './actionTypes';

const instance = axios.create({
    // TODO Assign URL of API
	baseURL: '//localhost:8081/extended-url',
	withCredentials: true
});

export function getSampleContent() {
	return function (dispatch) {
		console.log('Getting sample content');
		instance.get('/content').then(response => {
			dispatch({
				type: instr.GET_SAMPLE_CONTENTS,
				payload: {
					sampleContent: response.data
				}
			});
		}).catch(err => {
			dispatch({
				type: instr.FETCH_FAILED,
				payload: err
			});
		});
	};
}

export default instance;
