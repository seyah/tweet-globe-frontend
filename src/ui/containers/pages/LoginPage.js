import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {login, displayAuthError, displayMessage} from '../../../reducers/authentication';
import HeaderPage from '../layouts/HeaderPage';
import '../../style/pages/LoginPage.scss';
import {LinkContainer} from "react-router-bootstrap";
import {Button, Col, Grid, Row} from "react-bootstrap";

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        if (this.props.authentication.isAuthenticated) {
            this.props.dispatch(push(''));
        }
    }

    componentWillUpdate() {
        if (this.props.authentication.isAuthenticated) {
            this.props.dispatch(push(''));
        }
    }

    handleSubmit(formProps) {
        this.props.dispatch(login(formProps.email, formProps.password));
    }

    render() {
        let message = <div className="auth-message success">
            <i className="close fa fa-close" onClick={() => this.props.dispatch(displayMessage(null))}/>
            {this.props.authentication.message}
        </div>;
        let errorMessage = <div className="auth-message error">
            <i className="close fa fa-close" onClick={() => this.props.dispatch(displayAuthError(null))}/>
            {this.props.authentication.errorMessage}
        </div>;

        return (
            <HeaderPage centered>
                {this.props.authentication.message !== null && message}
                {this.props.authentication.errorMessage !== null && errorMessage}
                <Grid fluid>
                    <Row>
                        <Col xs={12}>
                            <span className="text text-primary bold">Please enter your details to log in:</span>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col xs={12}>
                            <LoginForm onSubmit={this.handleSubmit}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            <LinkContainer to="/">
                                <a className="text text-primary hyper-link">Forgot Password?</a>
                            </LinkContainer>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <LinkContainer to="/register">
                                <a className="text text-primary hyper-link">Register</a>
                            </LinkContainer>
                        </Col>
                    </Row>
                </Grid>
            </HeaderPage>
        );
    }
}

let LoginForm = props => {
    // eslint-disable-next-line react/prop-types
    const {pristine, submitting, handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <Field name="email" component="input" type="email" placeholder="Email"/>
            </div>
            <div className="field">
                <Field name="password" component="input" type="password" placeholder="Password"/>
            </div>
            <div>
                <Button bsStyle="primary" disabled={pristine || submitting} onClick={handleSubmit}>
                    Submit
                </Button>
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
