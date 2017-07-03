import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Link from '../../../components/link/Link';
import Banner from '../../../components/banner/Banner';
import BannerImage from 'images/logo.png';
import './Header.scss';
import Logo from '../../../components/logo/Logo';

class Header extends Component {
	render() {
		let {authentication} = this.props;

		let accountLinks = authentication.isAuthenticated && authentication.user !== null ? (
			<div className="banner-link">
				<span className="fa fa-user"/><span className="text text-primary">Hi, {authentication.user.firstName}</span>
				<span>|</span>
				<Link link="/account" text="My Account"/>
			</div>
		) : (
			<div className="banner-link">
				<Link icon={<i className="fa fa-user-circle"/>} link="/login" text=" Login"/>
			</div>
		);
		return (
			<div className="header">
				<Banner logo={<Logo link="/" image={BannerImage}/>}>
					{accountLinks}
				</Banner>
			</div>
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
