export const equals = equalTo => value => value && value !== equalTo ?
	`Must be equal to ${equalTo}` :
	undefined;

export const email = value => value &&
!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
	'Invalid email address' :
	undefined;

export const required = value => value ? undefined : 'Required';

export const minLength = min => value => value &&
value.length < min ? `Must be longer than ${min} characters` : undefined;

export const password = value => {
	const error = {};

	if (value.length < 8) {
		error.minLength = true;
	}
	if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
		error.missingCase = true;
	}
	if (!/[0-9]/.test(value)) {
		error.missingNumber = true;
	}
	// eslint-disable-next-line no-useless-escape
	if (!/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(value)) {
		error.missingSymbol = true;
	}

	return error;
};
