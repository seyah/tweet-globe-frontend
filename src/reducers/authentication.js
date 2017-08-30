import {push} from 'react-router-redux';

const LOGIN = 'authentication/LOGIN';
const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/LOGIN_FAIL';

const LOGOUT = 'authentication/LOGOUT';
const LOGOUT_SUCCESS = 'authentication/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'authentication/LOGOUT_FAIL';

const REGISTER = 'authentication/REGISTER';
const REGISTER_SUCCESS = 'authentication/REGISTER_SUCCESS';
const REGISTER_FAIL = 'authentication/REGISTER_FAIL';

const GET_USER = 'authentication/GET_USER';
const GET_USER_SUCCESS = 'authentication/GET_USER_SUCCESS';
const GET_USER_FAIL = 'authentication/GET_USER_FAIL';

const MESSAGE = 'authentication/MESSAGE';
const ERROR_MESSAGE = 'authentication/ERROR_MESSAGE';

const initialState = {
	isAuthenticated: false,
	user: null,
	errorMessage: null,
	message: null,
	loading: true
};

// Reducer

export default function reducer(state = initialState, action) {
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
				user: null,
				errorMessage: action.error.response.data.message,
				message: null
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				errorMessage: null,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isAuthenticated: false,
				user: null,
				message: null,
				errorMessage: action.error.message
			};
		case GET_USER: {
			return {
				...state,
				loading: true
			}
		}
		case GET_USER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				user: {...action.result.data},
				errorMessage: null,
				loading: false
			};
		case GET_USER_FAIL:
			return {
				...state,
				isAuthenticated: false,
				user: null,
				message: null,
				loading: false,
				errorMessage: 'You must be logged in to do that!'
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				isAuthenticated: false,
				user: null
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
			dispatch(push('login'))
		}
	};
}

export function login(email, password) {
	return {
		types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
		promise: client => client.post('/auth/login', {email, password}),
		afterSuccess: (dispatch, getState, response) => {
			localStorage.setItem('auth-token', response.data.token);
			//const routingState = getState().router.locationBeforeTransitions.state || {};
			dispatch(getUser());
			dispatch(push(''))
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

export function getUser() {
	return {
		types: [GET_USER, GET_USER_SUCCESS, GET_USER_FAIL],
		promise: client => client.get('/api/user/me'),
		afterSuccess: (dispatch, getState, response) => {
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
