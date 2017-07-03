import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUser} from '../../../reducers/authentication';
import './Page.scss';

class Page extends Component {

	componentWillMount(){
		this.props.dispatch(getUser());
	}

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

export default connect()(Page);
