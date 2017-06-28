import React, {Component} from 'react';

import './Page.scss';
import Header from '../../containers/blocks/header/Header';
import Footer from '../../containers/blocks/footer/Footer';

class Page extends Component {

	render() {
		return (
			<div className="page">
				<Header/>
				{this.props.children}
				<Footer/>
			</div>
		);
	}

}

Page.contextTypes = {
	store: React.PropTypes.object.isRequired
};

export default Page;
