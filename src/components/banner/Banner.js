import React, {Component} from 'react';
import './Banner.scss';

class Banner extends Component {

	render() {
		return (
			<div className="banner">
				<div className="banner-left">
					{this.props.logo}
				</div>
				<div className="banner-right">
					{this.props.children}
				</div>
			</div>
		);
	}

}

Banner.propTypes = {
	logo: React.PropTypes.object
};

export default Banner;
