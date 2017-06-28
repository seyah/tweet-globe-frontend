import React, {Component} from 'react';
import Link from '../../../components/link/Link';
import Banner from '../../../components/banner/Banner';
import BannerImage from 'images/logo.png';
import './Header.scss';
import Logo from '../../../components/logo/Logo';

class Header extends Component {

	render() {
		return (
			<div className="header">
				<Banner logo={<Logo link="/" image={BannerImage} />}>
					<div className="banner-link">
						<Link link="/contact" text="Contact" />
					</div>
				</Banner>
			</div>
		);
	}
}

const mapStateToProps = function (state) {
	return {
		selectedCase: state.selectedCase
	};
};

export default Header;
