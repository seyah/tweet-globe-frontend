import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderPage from '../layouts/HeaderPage';
import '../../style/pages/AccountPage.scss';
import {Col, Grid, Row} from "react-bootstrap";

class AccountPage extends Component {
    render() {
        let {authentication} = this.props;

        return (
            <HeaderPage>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <h1>Hi, {authentication.user.username}</h1>
                            <br/>
                            <Grid fluid>
                                <Row>
                                    <Col xs={12} sm={4}>
                                        {"First Name:"}
                                    </Col>
                                    <Col xs={12} sm={8}>
                                        {authentication.user.firstName}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} sm={4}>
                                        {"Last Name:"}
                                    </Col>
                                    <Col xs={12} sm={8}>
                                        {authentication.user.lastName}
                                    </Col>
                                </Row>
                            </Grid>
                        </Col>
                    </Row>
                </Grid>
            </HeaderPage>
        );
    }
}

AccountPage.propTypes = {};

let mapStateToProps = (state) => {
    return {
        authentication: state.authentication
    }
};

export default connect(mapStateToProps)(AccountPage);
