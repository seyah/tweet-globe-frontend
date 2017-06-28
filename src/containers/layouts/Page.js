import React, {Component} from 'react';

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
	store: React.PropTypes.object.isRequired
};

export default Page;
