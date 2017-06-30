import axios from 'axios';

const axe = axios.create({
	baseURL: '//127.0.0.1:8080'
});

const setupAxiosInterceptors = onUnauthenticated => {
	const onRequestSuccess = config => {
		const token = localStorage.getItem('auth-token');
		if (token) {
			config.headers['x-auth-token'] = token;
		}
		config.timeout = 10000;
		return config;
	};
	const onResponseSuccess = response => response;
	const onResponseError = error => {
		if (error.status === 403) {
			localStorage.removeItem('auth-token');
			onUnauthenticated();
		}
		return Promise.reject(error);
	};
	axe.interceptors.request.use(onRequestSuccess);
	axe.interceptors.response.use(onResponseSuccess, onResponseError);
};

export {
	setupAxiosInterceptors
};

export default axe;
