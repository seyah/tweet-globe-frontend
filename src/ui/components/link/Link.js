import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';

import './Link.scss';

/*
 Use the `link` prop when linking within site (e.g. '/home')
 Use the `href` prop when linking to an external site (e.g. 'http://google.com')
 */

class Link extends Component {
	render() {
		return this.props.link ?
			<RouterLink
				className={`link ${this.props.className}`}
				onClick={() => this.props.onClick(this.props.text)}
				to={this.props.link}>
				{this.props.icon}
				{this.props.text}
			</RouterLink> :
			<a
				className={`link ${this.props.className}`}
				onClick={() => this.props.onClick(this.props.text)}
				{...(this.props.href ? {href: this.props.href} : {})}>
				{this.props.icon}
				{this.props.text}
			</a>;
	}
}

Link.propTypes = {
	icon: PropTypes.object,
	className: PropTypes.string,
	text: PropTypes.string,
	link: PropTypes.string,
	href: PropTypes.string,
	onClick: PropTypes.func
};

Link.defaultProps = {
	icon: <i/>,
	className: '',
	text: '',
	link: null,
	href: null,
	onClick: () => {
	}
};

export default Link;
