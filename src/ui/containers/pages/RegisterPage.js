import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {register, displayAuthError, displayMessage} from '../../../reducers/authentication';
import '../../style/pages/RegisterPage.scss';
import {LinkContainer} from "react-router-bootstrap";
import HeaderPage from "../layouts/HeaderPage";
import {Button, Col, Grid, Row} from "react-bootstrap";

class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount(){
	    if(this.props.authentication.isAuthenticated){
	        this.props.dispatch(push(''));
        }
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
			<HeaderPage centered>
                {this.props.authentication.message !== null && message}
                {this.props.authentication.errorMessage !== null && errorMessage}
                <Grid fluid>
                    <Row>
                        <Col xs={12}>
                            <span className="text text-primary bold">Please enter your details to register:</span>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col xs={12}>
                            <RegisterForm onSubmit={this.handleSubmit}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <LinkContainer to="/login">
                                <a className="text text-primary hyper-link">Already have an account?</a>
                            </LinkContainer>
                        </Col>
                    </Row>
                </Grid>
			</HeaderPage>
		);
	}
}

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
        <input {...input} placeholder={label} type={type}/>
        {touched &&
        ((error && <span className="text text-danger bold">{error}</span>) ||
        (warning && <span>{warning}</span>))}
    </div>
);

let RegisterForm = props => {
	// eslint-disable-next-line react/prop-types
	const {pristine, submitting, handleSubmit} = props;
	// eslint-disable-next-line react/prop-types

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
			<div>
				<Button bsStyle="primary" disabled={pristine || submitting} onClick={handleSubmit}>Submit</Button>
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
