import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {required} from '../../util/validate';
import BorderPage from '../layouts/BorderPage';
import logoImage from '../../../public/images/logo.png';
import '../../style/pages/LoginPage.scss';
import Link from '../../components/link/Link';

class LoginPage extends Component {
	render() {
		return (
			<BorderPage>
				<div className="content">
					<img src={logoImage} style={{width: '15%'}}/>
					<div className="login-box">
						<span className="text-primary bold">Please enter your details to log in:</span>
						<div className="login-form">
							<LoginForm/>
						</div>
						<span style={{display: 'block', textAlign: 'left'}} className="text-primary">
							<Link text="Forgot password?"/>
						</span>
						<span style={{display: 'block', textAlign: 'left'}} className="text-primary">
							<Link text="Register"/>
						</span>
					</div>
				</div>
			</BorderPage>
		);
	}
}

let LoginForm = props => {
	// eslint-disable-next-line react/prop-types
	const {pristine, submitting} = props;
	return (
		<form onSubmit={() => console.log('hi')}>
			<div className="field">
				<label className="text-primary bold" htmlFor="username">Username</label>
				<Field name="username" component="input" type="text" validate={[required]}/>
			</div>
			<div className="field">
				<label className="text-primary bold" htmlFor="password">Password</label>
				<Field name="password" component="input" type="password" validate={[required]}/>
			</div>
			<button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</button>
		</form>
	);
};

LoginForm = reduxForm({
	// A unique name for the form
	form: 'login'
})(LoginForm);

LoginPage.propTypes = {};

export default LoginPage;
