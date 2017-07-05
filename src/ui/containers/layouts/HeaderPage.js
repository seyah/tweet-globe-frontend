import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Page.scss';
import Header from '../blocks/header/Header';

class HeaderPage extends Component {
	render() {
		return (
			<div className="header-page">
				<Header/>
				{this.props.children}
			</div>
		);
	}
}

HeaderPage.defaultProps = {
	children: null
};

HeaderPage.propTypes = {
	children: PropTypes.any
};

export default HeaderPage;
