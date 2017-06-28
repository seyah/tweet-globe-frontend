import React, {Component} from 'react';
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

Logo.propTypes = {
	link: React.PropTypes.string,
	image: React.PropTypes.string
};

export default Logo;
