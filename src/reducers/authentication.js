import {history} from '../app';

const LOGIN = 'authentication/LOGIN';
const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/LOGIN_FAIL';

const LOGOUT = 'authentication/LOGOUT';
const LOGOUT_SUCCESS = 'authentication/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'authentication/LOGOUT_FAIL';

const REGISTER = 'authentication/REGISTER';
const REGISTER_SUCCESS = 'authentication/REGISTER_SUCCESS';
const REGISTER_FAIL = 'authentication/REGISTER_FAIL';

const MESSAGE = 'authentication/MESSAGE';
const ERROR_MESSAGE = 'authentication/ERROR_MESSAGE';

const initialState = {
	isAuthenticated: false,
	username: null,
	errorMessage: null,
	message: null,
	loading: true
};

// Reducer

export default function reducer(state = initialState, action) {
	console.log(action);
	switch (action.type) {
		case REGISTER_SUCCESS:
			return {
				...state,
				message: action.result.data.message,
				errorMessage: null
			};
		case REGISTER_FAIL:
			return {
				...state,
				isAuthenticated: false,
				username: null,
				errorMessage: action.error.response.data.message,
				message: null
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: action.result.data.authenticated,
				username: action.result.data.userName,
				errorMessage: null
			};
		case LOGIN_FAIL:
			return {
				...state,
				isAuthenticated: false,
				username: null,
				message: null,
				errorMessage: action.error.response.data.message
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				isAuthenticated: false,
				username: null
			};
		case MESSAGE:
			return {
				...state,
				message: action.message
			};
		case ERROR_MESSAGE:
			return {
				...state,
				errorMessage: action.message
			};
		default:
			return state;
	}
}

// Public action creators and async actions

export function displayAuthError(message) {
	return {type: ERROR_MESSAGE, message};
}

export function displayMessage(message) {
	return {type: MESSAGE, message};
}

export function register(details) {
	return {
		types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
		promise: client => client.post('/auth/register', details),
		afterSuccess: (dispatch, getState, response) => {
			history.push('login');
		}
	};
}

export function login(username, password) {
	return {
		types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
		promise: client => client.post('/api/session', {username, password}),
		afterSuccess: (dispatch, getState, response) => {
			localStorage.setItem('auth-token', response.headers['x-auth-token']);
			const routingState = getState().router.locationBeforeTransitions.state || {};
			history.push(routingState.nextPathname || '');
		}
	};
}

export function logout() {
	return {
		types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
		promise: client => client.delete('/api/session'),
		afterSuccess: () => {
			history.push('login');
		}
	};
}

export function redirectToLoginWithMessage(messageKey) {
	return (dispatch, getState) => {
		const currentPath = getState().router.locationBeforeTransitions.pathname;
		dispatch(displayAuthError(messageKey));
		history.replace({pathname: '/login', state: {nextPathname: currentPath}});
	};
}
