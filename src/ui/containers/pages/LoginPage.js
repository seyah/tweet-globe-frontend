import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {login, displayAuthError, displayMessage} from '../../../reducers/authentication';
import BorderPage from '../layouts/BorderPage';
import logoImage from '../../../../public/images/logo.png';
import '../../style/pages/LoginPage.scss';
import Link from '../../components/link/Link';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(formProps) {
		// TODO: Something to do with username and password
		console.log(formProps);
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
					<div className="login-box">
						<span className="text text-primary bold">Please enter your details to log in:</span>
						<div className="login-form">
							{this.props.authentication.message !== null && message}
							{this.props.authentication.errorMessage !== null && errorMessage}
							<LoginForm onSubmit={this.handleSubmit}/>
							<span className="text text-primary hyper-link">
								<Link text="Forgot password?"/>
							</span>
							<span className="text text-primary hyper-link">
								<Link link="/register" text="Register"/>
							</span>
						</div>
					</div>
				</div>
			</BorderPage>
		);
	}
}

let LoginForm = props => {
	// eslint-disable-next-line react/prop-types
	const {pristine, submitting, handleSubmit} = props;

	return (
		<form onSubmit={handleSubmit}>
			<div className="field">
				<Field name="username" component="input" type="text" placeholder="Username"/>
			</div>
			<div className="field">
				<Field name="password" component="input" type="password" placeholder="Password"/>
			</div>
			<div style={{textAlign: 'right'}}>
				<button
					className="btn btn-primary"
					disabled={pristine || submitting}>Submit</button>
			</div>
		</form>
	);
};

LoginForm = reduxForm({
	form: 'login'
})(LoginForm);

let mapStateToProps = (state) => {
	return {
		authentication: state.authentication
	}
};

export default connect(mapStateToProps)(LoginPage);
