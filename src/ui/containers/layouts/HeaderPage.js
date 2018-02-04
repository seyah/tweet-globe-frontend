import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Page.scss';
import Header from '../../components/header/Header';

class HeaderPage extends Component {
	render() {
		return ([
            <Header key={0}/>,
			<div key={1} className={"header-page" + (this.props.centered ? " centered" : "")}>
				{this.props.children}
			</div>
		]);
	}
}

HeaderPage.defaultProps = {
	centered: false,
	children: null
};

HeaderPage.propTypes = {
	centered: PropTypes.bool,
	children: PropTypes.any
};

export default HeaderPage;
