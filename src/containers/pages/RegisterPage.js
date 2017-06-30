import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {email, required, password} from '../../util/validate';
import BorderPage from '../layouts/BorderPage';
import logoImage from '../../../public/images/logo.png';
import '../../style/pages/RegisterPage.scss';
import Link from '../../components/link/Link';

class RegisterPage extends Component {
	render() {
		return (
			<BorderPage>
				<div className="content">
					<img src={logoImage} style={{width: '15%', minWidth: '100px'}}/>
					<div className="register-box">
						<span className="text-primary bold">Please enter your details to log in:</span>
						<div className="register-form">
							<RegisterForm/>
							<span className="text-primary hyper-link">
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
	const {pristine, submitting} = props;
	return (
		<form onSubmit={() => console.log('hi')}>
			<div className="field">
				<Field name="firstName" component="input" type="text" placeholder="First Name" validate={[required]}/>
			</div>
			<div className="field">
				<Field name="lastName" component="input" type="text" placeholder="Last Name" validate={[required]}/>
			</div>
			<div className="field">
				<Field name="username" component="input" type="text" placeholder="Username" validate={[required]}/>
			</div>
			<div className="field">
				<Field name="email" component="input" type="email" placeholder="Email" validate={[required, email]}/>
			</div>
			<div className="field">
				<Field
					name="password"
					component="input"
					type="password"
					placeholder="Enter password"
					validate={[required, password]}/>
			</div>
			<div className="field">
				<Field
					name="confirmPassword"
					component="input"
					type="password"
					placeholder="Confirm password"
					validate={[required]}/>
			</div>
			<div style={{textAlign: 'right'}}>
				<button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</button>
			</div>
		</form>
	);
};

RegisterForm = reduxForm({
	// A unique name for the form
	form: 'register'
})(RegisterForm);

RegisterPage.propTypes = {};

export default RegisterPage;
