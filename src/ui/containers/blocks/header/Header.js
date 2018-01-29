import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {IndexLinkContainer, LinkContainer} from "react-router-bootstrap";
import {logout} from "../../../../reducers/authentication";

class Header extends Component {
    render() {
        let {authentication} = this.props;

        let accountLinks = authentication.isAuthenticated && authentication.user !== null ? [
            <NavDropdown eventKey={1} title={<span>{authentication.user.username}</span>} id="nav-account">
                <LinkContainer to="/account"><MenuItem eventKey={1.1}>View Account</MenuItem></LinkContainer>
                <MenuItem divider/>
                <MenuItem eventKey={1.2} onClick={() => this.props.dispatch(logout())}>Logout</MenuItem>
            </NavDropdown>
        ] : [
            <LinkContainer to="/login"><NavItem>Login</NavItem></LinkContainer>,
            <LinkContainer to="/register"><NavItem>Register</NavItem></LinkContainer>
        ];

        return (
            <Navbar fixedTop inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        Tweet Globe
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <IndexLinkContainer to="/"><NavItem>Home</NavItem></IndexLinkContainer>
                        <LinkContainer to="/preferences"><NavItem>Preferences</NavItem></LinkContainer>
                        <LinkContainer to="/recommendations"><NavItem>Recommendations</NavItem></LinkContainer>
                        <LinkContainer to="/trends"><NavItem>Trends</NavItem></LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        {accountLinks}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

Header.propTypes = {
    authentication: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
    return {
        authentication: state.authentication
    };
};

export default connect(mapStateToProps)(Header);
