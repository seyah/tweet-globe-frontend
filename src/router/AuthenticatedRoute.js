import React, { Component, PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {getUser} from "../reducers/authentication";

class AuthenticatedRoute extends Component {
    componentWillMount() {
        this.props.dispatch(getUser());
    }

    render() {
        const {
            component: Component,
            render,
            isAuthenticated,
            loading,
            ...rest
        } = this.props;

        const renderComponent = props => {
            if (isAuthenticated) {
                return render ? render(props) : <Component {...props} />;
            }
            return (
                <Redirect
                    to={{
                        pathname: props.match.path,
                        state: { from: props.location },
                    }}
                />
            );
        };

        return loading ? <Route {...rest} render={renderComponent} /> : null;
    }
}

AuthenticatedRoute.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    loading: state.authentication.loading,
});

export default connect(mapStateToProps)(AuthenticatedRoute);