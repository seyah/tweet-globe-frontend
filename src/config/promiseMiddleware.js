import axe from '../rest/rest';

export default function promiseMiddleware({dispatch, getState}) {
	return next => action => {
		if (typeof action === 'function') {
			return action(dispatch, getState);
		}
		const {promise, types, afterSuccess, afterFailure, ...rest} = action;
		if (!action.promise) {
			return next(action);
		}

		const [REQUEST, SUCCESS, FAILURE] = types;
		next({...rest, type: REQUEST});

		const onFulfilled = result => {
			next({...rest, result, type: SUCCESS});
			if (afterSuccess) {
				afterSuccess(dispatch, getState, result);
			}
		};
		const onRejected = error => {
			next({...rest, error, type: FAILURE});
			if(afterFailure) {
				afterFailure(dispatch, getState, error)
			}
		};
		return promise(axe)
			.then(onFulfilled, onRejected)
			.catch(error => {
				console.error('MIDDLEWARE ERROR:', error);
				onRejected(error);
			});
	};
}
