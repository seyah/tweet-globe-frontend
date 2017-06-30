import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Page.scss';

class Page extends Component {
	render() {
		return (
			<div className="page">
				{this.props.children}
			</div>
		);
	}
}

Page.contextTypes = {
	store: PropTypes.object.isRequired
};

Page.defaultProps = {
	children: null
};

Page.propTypes = {
	children: PropTypes.any
};

export default Page;
