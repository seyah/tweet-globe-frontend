import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Title extends Component {
	render() {
		const {children} = this.props;

		return (
			<div className="title">
				<h1>{children}</h1>
			</div>
		);
	}
}

Title.defaultProps = {
	children: null
};

Title.propTypes = {
	children: PropTypes.any
};

export default Title;
