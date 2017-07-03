import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {register, displayAuthError, displayMessage} from '../../../reducers/authentication';
import BorderPage from '../layouts/BorderPage';
import logoImage from '../../../../public/images/logo.png';
import '../../style/pages/RegisterPage.scss';
import Link from '../../components/link/Link';

class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(formProps) {
		this.props.dispatch(register(formProps));
	}

	render() {

		let message = <div className="auth-message success">
			<i className="close fa fa-close" onClick={()=>this.props.dispatch(displayMessage(null))}/>
			{this.props.authentication.message}
		</div>;
		let errorMessage = <div className="auth-message error">
			<i className="close fa fa-close" onClick={()=>this.props.dispatch(displayAuthError(null))}/>
			{this.props.authentication.errorMessage}
		</div>;

		return (
			<BorderPage>
				<div className="content">
					<img src={logoImage} style={{width: '15%', minWidth: '100px'}}/>
					<div className="register-box">
						<span className="text text-primary bold">Please enter your details to log in:</span>
						<div className="register-form">
							<RegisterForm onSubmit={this.handleSubmit}/>
							{this.props.authentication.message !== null && message}
							{this.props.authentication.errorMessage !== null && errorMessage}
							<span className="text text-primary hyper-link">
								<Link link="/login" text="Already have an account?"/>
							</span>
						</div>
					</div>
				</div>
			</BorderPage>
		);
	}
}

let RegisterForm = props => {
	// eslint-disable-next-line react/prop-types
	const {pristine, submitting, handleSubmit} = props;
	// eslint-disable-next-line react/prop-types
	const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
		<div>
			<input {...input} placeholder={label} type={type}/>
			{touched &&
			((error && <span className="text text-danger bold">{error}</span>) ||
				(warning && <span>{warning}</span>))}
		</div>
	);
	return (
		<form onSubmit={handleSubmit}>
			<div className="field">
				<Field
					name="firstName"
					type="text"
					component={renderField}
					label="First Name"/>
			</div>
			<div className="field">
				<Field
					name="lastName"
					type="text"
					component={renderField}
					label="Last Name"/>
			</div>
			<div className="field">
				<Field
					name="username"
					type="text"
					component={renderField}
					label="Username"/>
			</div>
			<div className="field">
				<Field
					name="email"
					type="email"
					component={renderField}
					label="Email"/>
			</div>
			<div className="field">
				<Field
					name="password"
					type="password"
					component={renderField}
					label="Enter Password"/>
			</div>
			<div className="field">
				<Field
					name="matchingPassword"
					type="password"
					component={renderField}
					label="Confirm Password"/>
			</div>
			<div style={{textAlign: 'right'}}>
				<button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</button>
			</div>
		</form>
	);
};

const validate = values => {
	const errors = {};
	if (!values.firstName) {
		errors.firstName = 'Required';
	}
	if (!values.lastName) {
		errors.lastName = 'Required';
	}
	if (!values.username) {
		errors.username = 'Required';
	} else if (values.username.length > 15) {
		errors.username = 'Must be 15 characters or less';
	}
	if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	if (!values.password) {
		errors.password = 'Required';
	} else if (values.password.length < 6) {
		errors.password = 'Must be 6 characters or more';
	}
	return errors;
};

RegisterForm = reduxForm({
	form: 'register',
	validate
})(RegisterForm);

RegisterPage.propTypes = {
	authentication: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
};

let mapStateToProps = (state) => {
	return {
		authentication: state.authentication
	}
};

export default connect(mapStateToProps)(RegisterPage);
