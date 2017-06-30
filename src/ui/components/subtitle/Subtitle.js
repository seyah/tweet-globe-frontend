import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Subtitle extends Component {
	render() {
		const {children} = this.props;

		return (
			<h2 className="subtitle text text-primary bold">{children}</h2>
		);
	}
}

Subtitle.defaultProps = {
	children: null
};

Subtitle.propTypes = {
	children: PropTypes.any
};

export default Subtitle;
