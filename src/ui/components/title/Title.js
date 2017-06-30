import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Title extends Component {
	render() {
		const {children} = this.props;

		return (
			<h1 className="title text text-primary bold">{children}</h1>
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
