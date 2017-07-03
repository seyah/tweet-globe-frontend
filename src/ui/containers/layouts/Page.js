import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUser} from '../../../reducers/authentication';
import routes from '../../../router/routes';
import './Page.scss';



class Page extends Component {

	componentWillMount(){
		this.props.dispatch(getUser());
	}

	render() {
	    setTimeout(()=>{}, 100);
		return (
			<div className="page">
				{this.props.children}
			</div>
		);
	}
}

Page.defaultProps = {
	children: null
};

Page.propTypes = {
	children: PropTypes.any
};

export default connect()(Page);
