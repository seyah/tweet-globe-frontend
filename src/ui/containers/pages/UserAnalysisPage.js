import React, {Component} from 'react';
import "../../style/pages/UserAnalysisPage.scss";
import HeaderPage from "../layouts/HeaderPage";
import {connect} from "react-redux";
import {Button, Col, Grid, Row} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {getUserTweets} from "../../../reducers/twitter";

class TrendsPage extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(formProps) {
        this.props.dispatch(getUserTweets(formProps.user));
    }

    render() {

        return (
            <HeaderPage>
                <Grid className="user-analysis">
                    <Row>
                        <Col xs={12}>
                            <h2>User Profile Analysis</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={8} mdOffset={2}>
                            <p>This page allows you to load a public user profile and view their most recent 2000 tweets
                                and perform an analysis on them.</p>
                        </Col>
                    </Row>
                    <Row>
                        <UserSearchForm onSubmit={this.handleSubmit}/>
                    </Row>
                </Grid>
            </HeaderPage>
        );
    }
}

let UserSearchForm = props => {
    // eslint-disable-next-line react/prop-types
    const {pristine, submitting, handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Col xs={12} md={4} mdOffset={3}>
                <div className="field">
                    <Field name="user" component="input" type="text" placeholder="@User"/>
                </div>
            </Col>
            <Col xs={12} md={2}>
                <Button bsStyle="primary" disabled={pristine || submitting} onClick={handleSubmit}>
                    Submit
                </Button>
            </Col>
        </form>
    );
};

UserSearchForm = reduxForm({
    form: 'user-search'
})(UserSearchForm);

TrendsPage.defaultProps = {
    trends: [],
};

let mapStateToProps = (state) => {
    return {
        trends: state.trends
    }
};

export default connect(mapStateToProps)(TrendsPage);
