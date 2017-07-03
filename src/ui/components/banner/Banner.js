import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Banner.scss';

class Banner extends Component {
	render() {
		return (
			<div className="banner">
				<div className="banner-left">
					{this.props.logo}
                    {this.props.leftChildren}
				</div>
				<div className="banner-right">
					{this.props.children}
				</div>
			</div>
		);
	}
}

Banner.defaultProps = {
	logo: null,
	children: null,
	leftChildren: null,
};

Banner.propTypes = {
	logo: PropTypes.object,
	children: PropTypes.any,
	leftChildren: PropTypes.any,
};

export default Banner;
