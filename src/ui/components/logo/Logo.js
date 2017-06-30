import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Logo.scss';

class Logo extends Component {
	render() {
		return (
			<div className="brand-image">
				<a href={this.props.link}>
					<img src={this.props.image} alt="logo"/>
				</a>
			</div>
		);
	}
}

Logo.defaultProps = {
	link: '',
	image: null
};

Logo.propTypes = {
	link: PropTypes.string,
	image: PropTypes.string
};

export default Logo;
