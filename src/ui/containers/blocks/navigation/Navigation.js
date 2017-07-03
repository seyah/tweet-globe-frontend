import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Link from '../../../components/link/Link';

class Navigation extends Component {
	render() {
		let {authentication} = this.props;

		return (
		    <div className="navigation">
                <Link icon={<i className="fa fa-home"/>} link="/" text=" Home"/>
                <Link icon={<i className="fa fa-globe"/>} link="/" text=" View Map"/>
                <Link icon={<i className="fa fa-map-marker"/>} link="/" text=" Bookmarks"/>
                <Link icon={<i className="fa fa-filter"/>} link="/" text=" Filterer"/>
            </div>
        )
	}
}

Navigation.propTypes = {
	authentication: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
	return {
		authentication: state.authentication
	};
};

export default connect(mapStateToProps)(Navigation);
