import React, {Component} from 'react';

import './Page.scss';
import Header from '../../containers/blocks/header/Header';
import Footer from '../../containers/blocks/footer/Footer';

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
	store: React.PropTypes.object.isRequired
};

export default BorderPage;
