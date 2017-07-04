import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Page.scss';
import Header from '../blocks/header/Header';
import Footer from '../blocks/footer/Footer';

class BorderPage extends Component {
	render() {
		return (
			<div className="border-page">
				<Header/>
				{this.props.children}
				<Footer/>
			</div>
		);
	}
}

BorderPage.contextTypes = {
	store: PropTypes.object.isRequired
};

BorderPage.defaultProps = {
	children: null
};

BorderPage.propTypes = {
	children: PropTypes.any
};

export default BorderPage;
