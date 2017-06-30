import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TextEntry.scss';

class TextEntry extends Component {
	render() {
		const {title, children} = this.props;

		return (
			<div className="text-entry">
				<h2>{title}</h2>
				{children}
			</div>
		);
	}
}

TextEntry.propTypes = {
	title: PropTypes.node,
	children: PropTypes.any
};

TextEntry.defaultProps = {
	title: null,
	children: null
};

export default TextEntry;
