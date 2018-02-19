import axios from 'axios';

const axe = axios.create({
	baseURL: '//127.0.0.1:8081',
	timeout: 200000
});

const setupAxiosInterceptors = onUnauthenticated => {
	const onRequestSuccess = config => {
		const token = localStorage.getItem('auth-token');
		if (token) {
			config.headers['Authorization'] = 'Bearer ' + token;
		}
		config.timeout = 200000;
		return config;
	};
	const onResponseSuccess = response => response;
	const onResponseError = error => {
		if (error.status === 403) {
			localStorage.removeItem('auth-token');
			onUnauthenticated();
		}
		console.log(error);
		return Promise.reject(error);
	};
	axe.interceptors.request.use(onRequestSuccess);
	axe.interceptors.response.use(onResponseSuccess, onResponseError);
};

export {
	setupAxiosInterceptors
};

export default axe;
