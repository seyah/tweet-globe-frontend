import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Page.scss';
import Header from '../blocks/header/Header';
import Footer from '../blocks/footer/Footer';

class BorderlessPage extends Component {
	render() {
		return (
			<div className="borderless-page">
				<Header/>
				{this.props.children}
				<Footer/>
			</div>
		);
	}
}

BorderlessPage.contextTypes = {
	store: PropTypes.object.isRequired
};

BorderlessPage.defaultProps = {
	children: null
};

BorderlessPage.propTypes = {
	children: PropTypes.any
};

export default BorderlessPage;
