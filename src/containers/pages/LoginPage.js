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
					<img src={logoImage} style={{width: '15%', minWidth: '100px'}}/>
					<div className="login-box">
						<span className="text-primary bold">Please enter your details to log in:</span>
						<div className="login-form">
							<LoginForm/>
							<span className="text-primary hyper-link">
								<Link text="Forgot password?"/>
							</span>
							<span className="text-primary hyper-link">
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
	const {pristine, submitting} = props;
	return (
		<form onSubmit={() => console.log('hi')}>
			<div className="field">
				<Field name="username" component="input" type="text" placeholder="Username" validate={[required]}/>
			</div>
			<div className="field">
				<Field name="password" component="input" type="password" placeholder="Password" validate={[required]}/>
			</div>
			<div style={{textAlign: 'right'}}>
				<button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</button>
			</div>
		</form>
	);
};

LoginForm = reduxForm({
	// A unique name for the form
	form: 'login'
})(LoginForm);

LoginPage.propTypes = {};

export default LoginPage;
